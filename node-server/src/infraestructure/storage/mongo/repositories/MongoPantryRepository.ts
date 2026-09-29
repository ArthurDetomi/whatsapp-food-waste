import { PantryItem } from "../../../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../../../domain/ports/PantryRepository.js";
import { PantryModel } from "../models/PantryModel.js";

export class MongoPantryRepository implements PantryRepository {
  async save(item: PantryItem): Promise<PantryItem> {
    const document = new PantryModel({
      userId: item.userId,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      expirationDate: item.expirationDate,
    });

    const savedDoc = await document.save();

    return new PantryItem({
      id: savedDoc._id.toString(),
      userId: savedDoc.userId,
      name: savedDoc.name,
      quantity: savedDoc.quantity,
      unit: savedDoc.unit,
      expirationDate: savedDoc.expirationDate,
    });
  }
}
