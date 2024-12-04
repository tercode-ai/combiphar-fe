import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { EnhanceTypes } from '@/constants/data';
import { capitalizeFirstLetter } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Textarea } from '@/components/ui/textarea';
import { useCreateEnhance, useEditEnhance } from './queries';
import { EnhanceTypes as Type } from '@/types/enhance';
import { useDialog } from '@/hooks/use-dialog';
import { toast } from '@/components/ui/use-toast';
import { refetchQueries } from '@/lib/refetcher';
import React from 'react';
import { useEnhanceState } from './hook/table';

const formSchema = z.object({
  id: z.string(),
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

  const {
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (actionType === 'create') {
      mutateAsync({
        type: data.type as Type,
        value: data.value
      });
    } else if (actionType === 'edit') {
      mutateAsyncUpdate({
        id: data.id,
        type: data.type as Type,
        value: data.value
      });
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="space-y-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enhance Type</FormLabel>
                <Select
                  key={actionType}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EnhanceTypes.map((item) => (
                      <SelectItem value={item} key={item}>
                        {capitalizeFirstLetter(item)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter enhancement here"
                    className="resize-none"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
