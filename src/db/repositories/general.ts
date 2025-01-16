export interface GeneralRepository {
  getDatabaseVersion(): Promise<number>
}
