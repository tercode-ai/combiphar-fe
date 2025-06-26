import { createTableState } from '@/hooks/use-table';
import { Enhance } from '@/types/enhance';

export const useEnhanceState = createTableState<Enhance>({
  id: '',
  value: '',
  timestamp: '',
  type: 'postfix'
});
