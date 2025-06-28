import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';
import { useState } from 'react';
import FormModal from './_components/form-modal';
import DetailModal from './_components/detail-modal';

const tableData = [
  {
    id: 1,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 2,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'DOCX',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 3,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 4,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'DOCX',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 5,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 6,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'DOCX',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 7,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'DOCX',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 8,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 9,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'DOCX',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  },
  {
    id: 10,
    fileId: '1122334455',
    documentName: 'aab-ccdd-eeff-gghh',
    documentType: 'PDF',
    description: 'lorem ipsum dolor sit amet',
    dateCreate: '08-06-2025 08:24',
    dateUpdate: '08-06-2025 09:10'
  }
];

const FilesPage = () => {
  const [modal, setModal] = useState<'edit' | 'create' | 'detail' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = 100; // Contoh total entri

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
      <div>
        <div className="overflow-hidden rounded-lg ">
          <div className="flex rounded-lg bg-[#5C47DB]  p-4 text-white">
            <div className="w-[5%] flex-shrink-0 text-center font-medium">
              NO
            </div>
            <div className="w-[15%] flex-shrink-0 text-center font-medium">
              FILE ID
            </div>
            <div className="w-[20%] flex-shrink-0 font-medium">
              DOCUMENT NAME
            </div>
            <div className="w-[20%] flex-shrink-0 font-medium">DESCRIPTION</div>
            <div className="w-[15%] flex-shrink-0 text-center font-medium">
              DATA CREATE
            </div>
            <div className="w-[15%] flex-shrink-0 text-center font-medium">
              DATA UPDATE
            </div>
            <div className="w-[10%] flex-shrink-0 text-center font-medium">
              ACTION
            </div>
          </div>

          <div className="mt-2 max-h-[500px] divide-y divide-gray-200 overflow-y-auto bg-white shadow-xl">
            {tableData.map((row, index) => (
              <div
                key={row.id}
                className="flex items-center px-4 py-3 text-sm text-gray-800 hover:bg-gray-50"
              >
                <div className="w-[5%] flex-shrink-0 text-center">
                  {index + 1}
                </div>
                <div className="w-[15%] flex-shrink-0 text-center">
                  {row.fileId}
                </div>
                <div className="w-[20%] flex-shrink-0">
                  <div className="font-semibold">{row.documentName}</div>
                  <div className="text-xs text-gray-500">
                    {row.documentType}
                  </div>
                </div>
                <div className="w-[20%] flex-shrink-0">{row.description}</div>
                <div className="w-[15%] flex-shrink-0 text-center">
                  {row.dateCreate}
                </div>
                <div className="w-[15%] flex-shrink-0 text-center">
                  {row.dateUpdate}
                </div>
                <div className="flex w-[10%] flex-shrink-0 justify-center space-x-2">
                  <button
                    className="text-xs font-semibold text-gray-600 hover:text-gray-800"
                    onClick={() => setModal('detail')}
                  >
                    View
                  </button>
                  <button
                    onClick={() => setModal('edit')}
                    className="text-xs font-semibold text-gray-600 hover:text-gray-800"
                  >
                    Edit
                  </button>
                  <button className="text-xs font-semibold text-gray-600 hover:text-gray-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-[#F8F8F8] px-4 py-3">
          <div className="text-sm ">
            Showing {tableData.length * (currentPage - 1) + 1} to{' '}
            {tableData.length * currentPage} of {totalEntries} entries
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">The page you're on</span>
            <Select onValueChange={(val) => console.log('Selected:', val)}>
              <SelectTrigger className="w-[50px] border-none bg-white">
                <SelectValue defaultValue="1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-500"
                disabled
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white">
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default FilesPage;
