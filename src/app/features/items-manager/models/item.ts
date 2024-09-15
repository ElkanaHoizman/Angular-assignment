export interface Item {
  id:number
  color?: string;
  name?: string;
  createDate?: Date | string;
  lastUpdate?: Date | string;
  createdBy?: string;
}

export interface ItemDialog extends Item {
  isEdit?: boolean;
}
