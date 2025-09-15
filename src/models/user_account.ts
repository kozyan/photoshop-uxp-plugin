
export interface user_account{
	user_id?:string;
	user_account?:string;
	user_name?:string;
	user_password?:string;
	user_email?:string;
	user_mobile?:string;
	user_phone?:string;
	user_address?:string;
	user_record_number?:number;
	user_state?:string;
	user_valid_days?:number;
	user_create_date?:Date;
	user_loginIp?:string;
	user_remark?:string;
	user_view_mode?:string;
	user_personal_param?:string;
	user_dvs_id?:string;
	user_code?:string;
	user_post?:string;
	user_title?:string;
  nickname?: string;
  remote_account?: string;
  remote_password?: string;
  remote_ip?: string;
}
