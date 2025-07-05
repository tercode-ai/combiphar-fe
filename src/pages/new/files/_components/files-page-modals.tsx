import FormModal from './form-modal';
import DetailModal from './detail-modal';
import DeleteModal from './delete-modal';

type TModal = 'delete' | 'edit' | 'create' | 'detail' | null;

interface IFilesPageModals {
  modal: TModal;
  setModal: (modal: TModal) => void;
}

const FilesPageModals = ({ modal, setModal }: IFilesPageModals) => {
  return (
    <>
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
    </>
  );
};

export default FilesPageModals;
