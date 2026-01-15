export interface UserStorageUsage {
  user_id: string;
  username: string;
  email: string;
  role: string;
  file_storage_bytes: number;
  database_storage_bytes: number;
  total_storage_bytes: number;
  last_calculated_at: string | null;
}

export interface StorageStats {
  total_users: number;
  total_file_storage: number;
  total_database_storage: number;
  total_storage: number;
  average_storage_per_user: number;
}

export interface StorageCalculationResult {
  user_id: string;
  username: string;
  file_storage_bytes: number;
}
