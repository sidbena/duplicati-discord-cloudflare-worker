interface BackendStatistics {
  RemoteCalls: number;
  BytesUploaded: number;
  BytesDownloaded: number;
  FilesUploaded: number;
  FilesDownloaded: number;
  FilesDeleted: number;
  FoldersCreated: number;
  RetryAttempts: number;
  UnknownFileSize: number;
  UnknownFileCount: number;
  KnownFileCount: number;
  KnownFileSize: number;
  LastBackupDate: string;
  BackupListCount: number;
  TotalQuotaSpace: number;
  FreeQuotaSpace: number;
  AssignedQuotaSpace: number;
  ReportedQuotaError: boolean;
  ReportedQuotaWarning: boolean;
  MainOperation: string;
  ParsedResult: ParsedResult;
  Interrupted: boolean;
  Version: string;
  EndTime: string;
  BeginTime: string;
  Duration: string;
  MessagesActualLength: number;
  WarningsActualLength: number;
  ErrorsActualLength: number;
}

interface CompactResults {
  DeletedFileCount: number;
  DownloadedFileCount: number;
  UploadedFileCount: number;
  DeletedFileSize: number;
  DownloadedFileSize: number;
  UploadedFileSize: number;
  Dryrun: boolean;
  VacuumResults: null;
  MainOperation: string;
  ParsedResult: ParsedResult;
  Interrupted: boolean;
  Version: string;
  EndTime: string;
  BeginTime: string;
  Duration: string;
  MessagesActualLength: number;
  WarningsActualLength: number;
  ErrorsActualLength: number;
  BackendStatistics: BackendStatistics;
}

interface Verification {
  Key: string;
  Value: any[];
}

interface TestResults {
  MainOperation: string;
  VerificationsActualLength: number;
  Verifications: Verification[];
  ParsedResult: ParsedResult;
  Interrupted: boolean;
  Version: string;
  EndTime: string;
  BeginTime: string;
  Duration: string;
  MessagesActualLength: number;
  WarningsActualLength: number;
  ErrorsActualLength: number;
  BackendStatistics: BackendStatistics;
}

interface DeleteResults {
  DeletedSetsActualLength: number;
  DeletedSets: any[];
  Dryrun: boolean;
  MainOperation: string;
  CompactResults: CompactResults;
  ParsedResult: ParsedResult;
  Interrupted: boolean;
  Version: string;
  EndTime: string;
  BeginTime: string;
  Duration: string;
  MessagesActualLength: number;
  WarningsActualLength: number;
  ErrorsActualLength: number;
  BackendStatistics: BackendStatistics;
}

interface Data {
  DeletedFiles: number;
  DeletedFolders: number;
  ModifiedFiles: number;
  ExaminedFiles: number;
  OpenedFiles: number;
  AddedFiles: number;
  SizeOfModifiedFiles: number;
  SizeOfAddedFiles: number;
  SizeOfExaminedFiles: number;
  SizeOfOpenedFiles: number;
  NotProcessedFiles: number;
  AddedFolders: number;
  TooLargeFiles: number;
  FilesWithError: number;
  ModifiedFolders: number;
  ModifiedSymlinks: number;
  AddedSymlinks: number;
  DeletedSymlinks: number;
  PartialBackup: boolean;
  Dryrun: boolean;
  MainOperation: string;
  CompactResults: CompactResults;
  VacuumResults: null;
  DeleteResults: DeleteResults;
  RepairResults: null;
  TestResults: TestResults;
  ParsedResult: ParsedResult;
  Interrupted: boolean;
  Version: string;
  EndTime: string;
  BeginTime: string;
  Duration: string;
  MessagesActualLength: number;
  WarningsActualLength: number;
  ErrorsActualLength: number;
  BackendStatistics: BackendStatistics;
}

interface Extra {
  OperationName: string;
  'machine-id': string;
  'machine-name': string;
  'backup-name': string;
  'backup-id': string;
}

export interface DuplicatiResponse {
  Data: Data;
  Extra: Extra;
  LogLines: any[];
  Exception: null;
}

export type ParsedResult = 'Success' | 'Warning' | 'Error' | 'Fatal';

interface Attachment {
  id: string
  filename: string
  size: number
  url: string
  proxy_url: string
  height?: number
  width: number
}

interface Author {
  name?: string
  url?: string
  icon_url?: string | Attachment
  proxy_icon_url?: string
}
interface Field {
  name: string
  value: string
  inline?: boolean
}

interface Footer {
  text: string
  icon_url?: string | Attachment
  proxy_icon_url?: string
}
interface Image {
  url: string | Attachment
  proxy_url?: string
  height?: number
  width?: number
}
interface Provider {
  name?: string
  url?: string
}
interface Thumbnail {
  url: string | Attachment
  proxy_url?: string
  height?: number
  width?: number
}

interface Video {
  url: string
  height?: number
  width?: number
}

export interface Embed {
  title?: string
  type?: 'rich'
  url?: string
  description?: string
  timestamp?: string
  color?: number
  footer?: Footer
  image?: Image
  thumbnail?: Thumbnail
  video?: Video
  provider?: Provider
  author?: Author
  fields?: Array<Field>
}