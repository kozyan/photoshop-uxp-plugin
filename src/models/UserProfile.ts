import { Hash } from "src/dto/Hash";

export interface UserProfile {
  UserRecordNumber?: number;
  WebURL?: string;
  UserPersonalParam?: Hash<any>;
  languages?: any[];
}
