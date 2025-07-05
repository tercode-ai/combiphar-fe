import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Suspense, useState } from 'react';
import FormModal from './_components/form-modal';
import DetailModal from './_components/detail-modal';
import DeleteModal from './_components/delete-modal';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoaderCircle } from '@/components/shared/loader';
import { TDocItem } from '@/api/document/type';
import useGetListDocument from './_hooks/get-list-document';
import { formatDate } from '@/lib/utils';

const FilesPage = () => {
  const [modal, setModal] = useState<
    'delete' | 'edit' | 'create' | 'detail' | null
  >(null);
  const [tab, setTab] = useState('all');

  const query = useGetListDocument();

  const columns: ColumnDef<TDocItem>[] = [
    {
      accessorKey: 'id',
      header: 'NO',
      cell: ({ row }) => <div>{row.index + 1}</div>
    },
    {
      accessorKey: 'id',
      header: 'file id',
      cell: ({ row }) => (
        <div className="max-w-[150px]">{row.getValue('id')}</div>
      )
    },
    {
      accessorKey: 'portal_id',
      header: 'PORTAL ID',
      cell: ({ row }) => <div>{row.getValue('portal_id') ?? '-'}</div>
    },
    {
      id: 'document-info',
      header: 'document name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.document_name?.split('.')[0]}</span>
          <span className="font-semibold text-gray-400">PDF</span>
        </div>
      )
    },
    {
      accessorKey: 'dateCreate',
      header: 'Data Create',
      cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>
    },
    {
      accessorKey: 'dateUpdate',
      header: 'Data Update',
      cell: ({ row }) => (
        <div>
          {(row.original.updated_at && formatDate(row.original.updated_at)) ||
            '-'}
        </div>
      )
    },
    {
      accessorKey: 'metaData',
      header: '',
      cell: ({ row }) => {
        const isMetaDocument = row.original.metadata === 'Meta Data Document';
        const color = isMetaDocument ? '#5C47DB' : '#20AB4A';

        return (
          <div>
            <Badge
              className={`bg-[${color}]/10 text-[${color}] hover:bg-[${color}/15]`}
            >
              TODO
            </Badge>
          </div>
        );
      }
    },
    {
      header: 'Action',
      cell: ({ row }) => (
        <div>
          <Button variant="ghost" onClick={() => setModal('detail')}>
            View
          </Button>
          <Button variant="ghost" onClick={() => setModal('edit')}>
            Edit
          </Button>
          <Button
            className={
              row.original.metadata === 'Meta Data Document' ? 'hidden' : ''
            }
            variant="ghost"
            onClick={() => setModal('delete')}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Document Files</h1>
          <p className="text-gray-600">Organize all your document files here</p>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <input
            type="text"
            placeholder="Search"
            className="w-64 rounded-l-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="rounded-r-lg border-l border-gray-300 bg-gray-50 p-2 hover:bg-gray-100">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
                Filter Document Files
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>

        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() => setModal('create')}
        >
          Add New File
        </Button>
      </div>
      <Tabs
        defaultValue="all"
        onValueChange={(val) => {
          setTab(val);
        }}
      >
        <TabsList>
          <TabsTrigger value="all">All Document Files</TabsTrigger>
          <TabsTrigger value="metadata">Metadata Document</TabsTrigger>
          <TabsTrigger value="upload">Upload Document</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          <Suspense fallback={<LoaderCircle />}>
            <DataTable
              pageCount={10}
              loading={false}
              data={query.data?.data || []}
              columns={columns}
            />
          </Suspense>
        </TabsContent>
      </Tabs>

      <FormModal
        open={modal === 'create'}
        mode="create"
        onOpenChange={() => setModal(null)}
      />
      <FormModal
        open={modal === 'edit'}
        mode="edit"
        onOpenChange={() => setModal(null)}
        defaultValues={{
          document_name: 'Aturan Karyawan',
          description: 'Dokumen yang berisi aturan-aturan karyawan'
        }}
      />

      <DetailModal
        open={modal === 'detail'}
        onOpenChange={() => setModal(null)}
        data={{
          document_link: 'https://github.com/oemahsolution/dashboard-llm',
          document_name: 'Undang-undang karyawan',
          description:
            'Berisi aturan-aturan yang harus diikuti oleh karyawan, alur-alur peminjaman barang, informasi gaji, dll.',
          created_at: '2025-06-27 15:30 PM',
          updated_at: '2025-06-27 15:30 PM'
        }}
        onDelete={() => {}}
        onEdit={() => {
          setModal('edit');
        }}
      />

      <DeleteModal
        open={modal === 'delete'}
        data={{ document_name: 'Undang-undang Karyawan' }}
        onDelete={() => setModal(null)}
        onOpenChange={() => setModal(null)}
      />
    </div>
  );
};

export default FilesPage;
