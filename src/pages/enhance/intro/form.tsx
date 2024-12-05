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
import { useCreateIntro, useGetIntro, useUpdateIntro } from './queries';
import { toast } from '@/components/ui/use-toast';
import React from 'react';
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
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { mutateAsync } = useCreateIntro({
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Data updated successfully'
      });
    }
  });

  const { data: response } = useGetIntro();

  React.useEffect(() => {
    if (response?.data?.[0]) {
      const [id, type, value] = response.data[0];

      form.setValue('id', id);
      form.setValue('type', type);
      form.setValue('value', value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const { mutateAsync: mutateAsyncUpdate } = useUpdateIntro({
    onSuccess: () => {
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

  const onSubmit = async ({ id, value }: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (Number(response?.data?.length) > 0) {
      await mutateAsyncUpdate({
        id: String(id),
        value
      });
    } else {
      await mutateAsync({
        value
      });
    }
    setIsSubmitting(false);
    setIsEdit(false);
  };

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
        <section className="flex gap-2">
          <Button
            disabled={isSubmitting}
            variant={isEdit ? 'outline' : 'default'}
            type="button"
            className="w-20"
            onClick={handleEdit}
          >
            {isEdit ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            disabled={isSubmitting || !isEdit}
            type="submit"
            className="w-24"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit'}
          </Button>
        </section>
      </form>
    </Form>
  );
};
