export interface ITreeNodeVo {
  key: string;
  title: string;
  isLeaf: boolean;
  expanded: boolean;
  children: Array<TreeNodeVo>;
  data: any;
}

export type TreeNodeVo = Partial<ITreeNodeVo>;
