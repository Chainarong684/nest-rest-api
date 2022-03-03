import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { ItemDto } from './dto/item.dto';
import { ItemsService } from './items.service';
import { Item } from './model/item.model';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get()
  getAllItem(): Promise<Item[]> {
    return this.itemService.findAllItem();
  }

  @Get(':id')
  getItem(@Param('id') id: string): Promise<Item> {
    return this.itemService.findItemById(id);
  }

  @Post()
  addItem(@Body() itemDto: ItemDto): Promise<Item> {
    return this.itemService.insertItem(itemDto);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() itemDto: ItemDto): Promise<Item> {
    return this.itemService.updateItemById(id, itemDto);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): Promise<Item> {
    return this.itemService.deleteItemById(id);
  }
}
