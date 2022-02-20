import { Injectable, NotFoundException } from '@nestjs/common';

import { ItemDto } from './dto/item.dto';
import { Item } from './model/item.model';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '154263',
      name: 'Item A',
      qty: 20,
      detail: 'Very good',
    },
    {
      id: '124859',
      name: 'Item B',
      qty: 50,
      detail: 'good',
    },
    {
      id: '145275',
      name: 'Item C',
      qty: 60,
      detail: 'Not bad',
    },
  ];

  private findItem(id: string): Item {
    const item = this.items.find((val) => val.id === id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  findAllItem(): Item[] {
    const item = this.items;
    if (item.length === 0) {
      throw new NotFoundException('Item is Empty');
    }
    return item;
  }

  findItemById(id: string): Item {
    const item = this.findItem(id);
    return item;
  }

  insertItem(item: ItemDto): Item[] {
    this.items.push(item);
    return this.items;
  }

  updateItemById(id: string, item: ItemDto): Item {
    const index = this.items.findIndex((val) => val.id === id);
    const newItem: Item = { ...this.findItem(id) };

    if (item.name) {
      newItem.name = item.name;
    }
    if (item.qty) {
      newItem.qty = item.qty;
    }
    if (item.detail) {
      newItem.detail = item.detail;
    }

    this.items[index] = newItem;

    return newItem;
  }

  deleteItemById(id: string): Item {
    const index = this.items.findIndex((val) => val.id === id);
    const [item] = this.items.splice(index, 1);
    return item;
  }
}
