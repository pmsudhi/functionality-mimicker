
import { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TableColumn<T> {
  header: string;
  accessorKey: string;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface ResponsiveTableProps<T> {
  title?: string;
  data: T[];
  columns: TableColumn<T>[];
  keyField: keyof T;
  className?: string;
  emptyMessage?: string;
}

export function ResponsiveTable<T>({
  title,
  data,
  columns,
  keyField,
  className,
  emptyMessage = "No data available",
}: ResponsiveTableProps<T>) {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.accessorKey}
                  className={column.className}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="text-center p-4 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={String(item[keyField])}>
                  {columns.map((column) => (
                    <TableCell 
                      key={`${String(item[keyField])}-${column.accessorKey}`}
                      className={column.className}
                    >
                      {column.cell 
                        ? column.cell(item)
                        // @ts-ignore - We know this might not be typesafe, but it's a common pattern
                        : item[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
