/**
 * Created by Yc on 2016/5/30.
 */


var net = require('net');
function sendMail(host,user,pwd,to,msg,callback) {
    var socket = net.createConnection(25, host);
    var user64 = new Buffer(user).toString("base64");
    pwd = new Buffer(pwd ).toString("base64");
    socket.on('connect',function () {
        this.write('HELO '+user+'\r\n');
    });

    var op = ['AUTH LOGIN\r\n'];
    socket.pipe(process.stdout);
    socket.on('data',function (data) {
        data = data.toString();
        const code = data.match(/^\d{3}/)[0]
        switch (code){
            case '250':{
                var v = op.shift();
                console.log(250, v);
                if(v==='AUTH LOGIN\r\n'){
                    op.push(user64+'\r\n');
                    op.push(pwd+'\r\n');
                }else if(v==='RCPT TO:'+to+'\r\n'){
                    op.push('DATA\r\n');
                    op.push(msg+'\r\n.\r\n');
                }
                socket.write(v);
                break;
            }
            case '334':{
                var v = op.shift();
                socket.write(v);
                if(op.length===0) op.push('MAIL FROM:'+user+'\r\n');
                break;
            }
            case '235': socket.write(op.shift()); op.push('RCPT TO:'+to+'\r\n'); break;
            case '221': socket.end(); break;
            case '354': socket.write(op.shift()); op.push('QUIT'+'\r\n'); break;
            // default : console.log(data);
        }
    })
    socket.on('close', () => {
        callback && callback()
    })
}


module.exports = function(smtphost, user, pwd, to, senderName, title, content, callback) {
    try {
        sendMail(smtphost, user, pwd, to, 
            [`FROM: ${senderName}`, `Subject: ${title}`, `To: ${to}`, 'Content-Type: text/html'].join('\r\n')
            + '\r\n\r\n' + content,
            callback
        )
    }catch (ex) {
        console.error(ex);
    }
};

