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
import { useCreateEnhance } from './queries';
import { EnhanceTypes as Type } from '@/types/enhance';
import { useDialog } from '@/hooks/use-dialog';
import { toast } from '@/components/ui/use-toast';
import { refetchQueries } from '@/lib/refetcher';

const formSchema = z.object({
  type: z.string().min(1, {
    message: 'Required'
  }),
  value: z.string().min(1, {
    message: 'Required'
  })
});

export const FormSection = () => {
  const { setOpen } = useDialog();

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
    mutateAsync({
      type: data.type as Type,
      value: data.value
    });
  };

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
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
