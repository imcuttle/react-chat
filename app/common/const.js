


export default {
	DEFAULT_MSG: [
		"Usage:", 
		'1.input "# set email xxx@xxx.xxx" could set your email.',
		'2.input "# set name abc" could set your name.',
		'3.send message to chat.'
	].join('<br>'),
	EMAILCMD_REG: /^# set email (\w+@\w+\.\w+)$/,
	NAMECMD_REG: /^# set name (.+)$/
}