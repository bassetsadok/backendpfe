class Validator{
	static email(data){
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(data);
	}
	static dob(data){
		const re = /^\d{4}[-](0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])$/;
		return re.test(data);
	}
}

module.exports = Validator;
