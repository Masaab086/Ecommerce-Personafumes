export type ResponseCode =
  | "url_not_found"
  | "server_error"
  | "ok"
  | "unauthenticated"
  | "authenticated"
  | "user_not_found"
  | "already_logged_in"
  | "invalid_req_body"
  | "invalid_credentials"
  | "jwt_error"
  | "created"
  | "updated"
  | "deleted"
  | "duplicate_key"
  | "invalid_req_query"
  | "invalid_req_params"
  | "verification_token_error"
  | "email_already_verified"
  | "email_mismatch"
  | "subscriber_not_found"
  | "subscription_doc_not_found"
  | "already_have_active_subscription"
  | "no_active_subscription"
  | "projects_limit_exceeded"
  | "project_admins_exceeded"
  | "project_collaborators_exceeded"
  | "project_records_exceeded"
  | "project_not_found"
  | "record_not_found";

export interface ResponseObject {
  status: "success" | "fail" | "error";
  code: ResponseCode;
  message: string;
  [key: string]: any;
}
