import { FileUpload } from '@/components/shared/file-upload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { DocumentSchema, TDocumentFormData } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface Props {
  open?: boolean;
  onOpenChange: () => void;
  mode: 'create' | 'edit';
  defaultValues?: Partial<TDocumentFormData>;
}

const FormModal = ({ defaultValues, open, onOpenChange, mode }: Props) => {
  const metaMap: Record<Props['mode'], { title: string; desc: string }> = {
    create: {
      title: 'Add New File',
      desc: 'Add a new document to be used in AI training.'
    },
    edit: {
      title: 'Edit File',
      desc: 'Edit document used in AI model training.'
    }
  };

  const form = useForm<TDocumentFormData>({
    mode: 'onChange',
    resolver: zodResolver(DocumentSchema)
  });

  const handleSubmit = (data: TDocumentFormData) => {
    console.log(data);
  };

  console.log({
    err: form.formState.errors
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="no-scrollbar sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{metaMap[mode].title}</DialogTitle>
          <DialogDescription>{metaMap[mode].desc}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <div>
              <FormField
                control={form.control}
                name="document_path"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>Document *</FormLabel>
                      <FormControl>
                        <FileUpload
                          accept={{
                            'application/pdf': ['.pdf']
                          }}
                          maxFiles={1}
                          maxSize={10}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="document_name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Document Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Document Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="File description"
                        className="resize-none"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-2 sm:justify-start">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
