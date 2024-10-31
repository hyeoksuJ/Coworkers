export const TASK_REQUEST_INIT = {
  POST: {
    name: '',
    description: null,
    startDate: '',
    frequency: 'ONCE',
    monthDay: 0,
    weekDays: [],
  },
  PATCH: {
    name: '',
    description: '',
    done: false,
  },
  PATCH_ORDER: {
    displayIndex: 0,
  },
};

export const TASKLIST_REQUEST_INIT = {
  POST: {
    name: '',
  },
  PATCH: {
    name: '',
  },
  PATCH_ORDER: {
    displayIndex: 0,
  },
};
