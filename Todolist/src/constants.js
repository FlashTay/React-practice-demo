export const STATUS_MAP = {
  'TODO': 0,
  'DOING': 1,
  'DONE': 2
};

export const OPT_BTN_TEXT_MAP = {
  [STATUS_MAP.TODO]: '点击开始',
  [STATUS_MAP.DOING]: '点击完成',
  [STATUS_MAP.DONE]: '查看详情'
};

export const OPT_BTN_COLOR_MAP = {
  [STATUS_MAP.TODO]: '#faad14',
  [STATUS_MAP.DOING]: '#52c41a',
  [STATUS_MAP.DONE]: '#1677ff'
}

export const TODOLIST_TITLE_MAP = {
  [STATUS_MAP.TODO]: 'TODO',
  [STATUS_MAP.DOING]: 'DOING',
  [STATUS_MAP.DONE]: 'DONE'
};
