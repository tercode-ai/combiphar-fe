// import { dashboard, ranmor } from '@/lib/api';
// import { CountBpkaInput } from '@/types/dashboard';
// import { ListRanmorInput } from '@/types/ranmor';
// import { useQuery } from '@tanstack/react-query';

// export const useGetMainCount = (input: CountBpkaInput) => {
//   return useQuery({
//     queryKey: ['dashboard_bpka', input],
//     queryFn: async () => dashboard.count(input)
//   });
// };

// export const useGetKabupaten = () => {
//   return useQuery({
//     queryKey: ['bpka_kabupaten'],
//     queryFn: async () => dashboard.listKabupaten()
//   });
// };

// export const useGetKecamatan = (kode_upt: string) => {
//   return useQuery({
//     queryKey: ['bpka_kecamatan'],
//     queryFn: async () => dashboard.listKecamatan({ kode_upt })
//   });
// };

// export const useGetKelurahan = (kd_pos: string) => {
//   return useQuery({
//     queryKey: ['bpka_kelurahan'],
//     queryFn: async () => dashboard.listKelurahan({ kd_pos })
//   });
// };

// export const useGetRanmorList = (input: ListRanmorInput) => {
//   const { page, limit, search, filter } = input;
//   return useQuery({
//     queryKey: [
//       'list_ranmor',
//       page,
//       limit,
//       search,
//       filter?.status,
//       filter?.sync_at_date_end
//     ],
//     queryFn: async () => ranmor.list(input)
//   });
// };

// export const useGetLastSynced = () => {
//   return useQuery({
//     queryKey: ['last_synced'],
//     queryFn: async () => dashboard.lastSynced()
//   });
// };
