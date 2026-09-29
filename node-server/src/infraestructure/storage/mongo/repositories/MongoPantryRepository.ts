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
      isActive: true,
    });

    const savedDoc = await document.save();

    return new PantryItem({
      id: savedDoc._id.toString(),
      userId: savedDoc.userId,
      name: savedDoc.name,
      quantity: savedDoc.quantity,
      unit: savedDoc.unit,
      expirationDate: savedDoc.expirationDate,
      isActive: savedDoc.isActive,
    });
  }

  async findActiveByUserId(userId: string): Promise<PantryItem[]> {
    const items = await PantryModel.find({
      userId: userId,
      isActive: true,
    });

    return items.map(
      (item) =>
        new PantryItem({
          id: item._id.toString(),
          userId: item.userId,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          expirationDate: item.expirationDate,
          isActive: item.isActive,
        }),
    );
  }

  async update(item: PantryItem): Promise<PantryItem> {
    const updated = await PantryModel.findByIdAndUpdate(
      item.id,
      {
        userId: item.userId,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        expirationDate: item.expirationDate,
        isActive: item.isActive,
      },
      { new: true },
    );

    if (!updated) {
      throw new Error("Pantry item not found!");
    }

    return new PantryItem({
      id: updated._id.toString(),
      userId: updated.userId,
      name: updated.name,
      quantity: updated.quantity,
      unit: updated.unit,
      expirationDate: updated.expirationDate,
      isActive: updated.isActive,
    });
  }

  async findById(id: string): Promise<PantryItem> {
    const item = await PantryModel.findById(id);

    if (!item) {
      throw new Error("Item not found!");
    }

    return new PantryItem({
      id: item._id.toString(),
      userId: item.userId,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      expirationDate: item.expirationDate,
      isActive: item.isActive,
    });
  }
}
