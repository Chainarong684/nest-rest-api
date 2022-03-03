import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ItemDto } from './dto/item.dto';
import { Item } from './model/item.model';
import { Item as Items, ItemDocument } from './schema/item.schema';
@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name) private itemModel: Model<ItemDocument>,
  ) {}

  async findAllItem(): Promise<Item[]> {
    const item = await this.itemModel.find();
    if (item.length === 0) {
      throw new NotFoundException('Item is Empty');
    }
    return item;
  }

  async findItemById(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async insertItem(item: ItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async updateItemById(id: string, item: ItemDto): Promise<Item> {
    const updateItem = await this.itemModel.findByIdAndUpdate(id, item, {
      new: true,
    });
    return updateItem;
  }

  async deleteItemById(id: string): Promise<Item> {
    const item = await this.itemModel.findByIdAndDelete(id);
    return item;
  }
}
