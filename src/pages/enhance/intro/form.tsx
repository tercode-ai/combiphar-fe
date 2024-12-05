import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Textarea } from '@/components/ui/textarea';
import { useCreateEnhance, useEditEnhance } from '../queries';
import { EnhanceTypes as Type } from '@/types/enhance';
import { useDialog } from '@/hooks/use-dialog';
import { toast } from '@/components/ui/use-toast';
import { refetchQueries } from '@/lib/refetcher';
import React from 'react';
import { useEnhanceState } from '../hook/table';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, {
    message: 'Required'
  }),
  value: z.string().min(1, {
    message: 'Required'
  })
});

export const FormSection = () => {
  const { setOpen } = useDialog();
  const { actionType, data } = useEnhanceState();

  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { mutateAsync } = useCreateEnhance({
    onSuccess: () => {
      refetchQueries(['list_enhance']);
      setOpen(false);
      toast({
        variant: 'default',
        title: 'Data created successfully'
      });
    }
  });

  const { mutateAsync: mutateAsyncUpdate } = useEditEnhance({
    onSuccess: () => {
      refetchQueries(['list_enhance']);
      setOpen(false);
      toast({
        variant: 'default',
        title: 'Data updated successfully'
      });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: ''
    }
  });

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (actionType === 'create') {
      await mutateAsync({
        type: data.type as Type,
        value: data.value
      });
    } else if (actionType === 'edit') {
      await mutateAsyncUpdate({
        id: String(data.id),
        type: data.type as Type,
        value: data.value
      });
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    if (actionType === 'edit') {
      form.setValue('id', data.id);
      form.setValue('type', data.type);
      form.setValue('value', data.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <section className="space-y-2">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={isEdit ? 'Enter greeting here' : ''}
                    className="resize-none"
                    rows={6}
                    disabled={!isEdit}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section className="space-x-2">
          <Button
            disabled={isSubmitting}
            variant={isEdit ? 'outline' : 'default'}
            type="button"
            className="w-20"
            onClick={handleEdit}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </Button>
          <Button disabled={isSubmitting || !isEdit} type="submit" className="">
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit'}
          </Button>
        </section>
      </form>
    </Form>
  );
};
