export interface DialogData {
  width?: string;
  enterAnimationDuration?: string;
  exitAnimationDuration?: string;
  data: DataContent;
  className?: string;
}
interface DataContent {
  title?: string;
  massage?: string;
  No?: string;
  Ok?: string;
}
