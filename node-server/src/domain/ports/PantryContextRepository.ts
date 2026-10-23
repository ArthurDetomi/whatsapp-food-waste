export interface PantryContextRepository {
  saveReferences(
    phone: string,
    references: Record<string, string>,
  ): Promise<void>;

  findItemId(phone: string, identifier: string): Promise<string | undefined>;
}
