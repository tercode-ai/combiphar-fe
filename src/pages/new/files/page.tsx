import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import FormModal from './_components/form-modal';
import DetailModal from './_components/detail-modal';
import DeleteModal from './_components/delete-modal';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/shared/data-table';
import { Badge } from '@/components/ui/badge';

type TDocument = {
  id: number;
  fileId: string;
  portalID: string;
  documentName: string;
  documentType: string;
  description: string;
  dateCreate: string;
  dateUpdate: string;
  metaData: string;
};

const data: TDocument[] = [
  {
    id: 1,
    fileId: '1122334455',
    portalID: 'PORTAL-001',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Meta Data Document'
  },
  {
    id: 2,
    fileId: '1122334455',
    portalID: 'PORTAL-002',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Upload Document'
  },
  {
    id: 3,
    fileId: '1122334455',
    portalID: 'PORTAL-003',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Meta Data Document'
  },
  {
    id: 4,
    fileId: '1122334455',
    portalID: 'PORTAL-004',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Upload Document'
  },
  {
    id: 5,
    fileId: '1122334455',
    portalID: 'PORTAL-005',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Meta Data Document'
  },
  {
    id: 6,
    fileId: '1122334455',
    portalID: 'PORTAL-006',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Upload Document'
  },
  {
    id: 7,
    fileId: '1122334455',
    portalID: 'PORTAL-007',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Meta Data Document'
  },
  {
    id: 8,
    fileId: '1122334455',
    portalID: 'PORTAL-008',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Upload Document'
  },
  {
    id: 9,
    fileId: '1122334455',
    portalID: 'PORTAL-009',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Meta Data Document'
  },
  {
    id: 10,
    fileId: '1122334455',
    portalID: 'PORTAL-010',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10',
    metaData: 'Upload Document'
  }
];

const FilesPage = () => {
  const [modal, setModal] = useState<
    'delete' | 'edit' | 'create' | 'detail' | null
  >(null);

  const columns: ColumnDef<TDocument>[] = [
    {
      accessorKey: 'id',
      header: 'NO',
      cell: ({ row }) => <div>{row.index + 1}</div>
    },
    {
      accessorKey: 'fileId',
      header: 'file id',
      cell: ({ row }) => <div>{row.getValue('fileId')}</div>
    },
    {
      accessorKey: 'portalID',
      header: 'PORTAL ID',
      cell: ({ row }) => <div>{row.getValue('portalID')}</div>
    },
    {
      id: 'document-info',
      header: 'document name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span>{row.original.documentName}</span>
          <span className="font-semibold text-gray-400">
            {row.original.documentType}
          </span>
        </div>
      )
    },
    {
      accessorKey: 'dateCreate',
      header: 'Data Create',
      cell: ({ row }) => <div>{row.getValue('dateCreate')}</div>
    },
    {
      accessorKey: 'dateUpdate',
      header: 'Data Update',
      cell: ({ row }) => <div>{row.getValue('dateUpdate')}</div>
    },
    {
      accessorKey: 'metaData',
      header: '',
      cell: ({ row }) => {
        const isMetaDocument = row.original.metaData === 'Meta Data Document';
        const color = isMetaDocument ? '#5C47DB' : '#20AB4A';

        return (
          <div>
            <Badge
              className={`bg-[${color}]/10 text-[${color}] hover:bg-[${color}/15]`}
            >
              {row.getValue('metaData')}
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
              row.original.metaData === 'Meta Data Document' ? 'hidden' : ''
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

      <DataTable pageCount={10} loading={false} data={data} columns={columns} />

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
