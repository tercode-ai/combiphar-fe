/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useRouter } from '@/routes/hooks';
import { Fragment } from 'react';

export function Breadcrumbs({ items }: { items: any[] }) {
  const { push } = useRouter();

  const handleBreadcrumbClick = (index: number) => {
    const newPath = items
      .slice(0, index + 1)
      .map((item) => item.id)
      .join('/');
    push('/' + newPath);
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        {items.map((item, index) => (
          <Fragment key={item.id}>
            {index !== items.length - 1 && (
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {item.name?.toLowerCase()}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
            {index === items.length - 1 && (
              <BreadcrumbPage>{item.name?.toLowerCase()}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
