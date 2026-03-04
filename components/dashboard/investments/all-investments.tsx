"use client";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, MapPin } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { InvestmentDetailsView } from "./details/investmentDetailsView";
import { StatusBadge } from "@/components/shared";
interface PropertiesTableData {
  id: string;
  property: string;
  type: string;
  status: string;
  funding_progress: {
    value: number;
    formatted: string;
  };
  target_amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  raised_amount: {
    currency: string;
    value: number;
    formatted: string;
  };
  returns: {
    value: number;
    unit: string;
    formatted: string;
  };
  investors: number;
  location: string;
}

export function AllInvestments() {
  const properties = [
    {
      id: "200",
      property: "Victoria Island Office Complex",
      type: "Commercial",
      status: "Active",
      funding_progress: {
        value: 85,
        formatted: "85%",
      },
      target_amount: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.0M",
      },
      raised_amount: {
        currency: "NGN",
        value: 42500000,
        formatted: "₦42.5M",
      },
      returns: {
        value: 18,
        unit: "percent",
        formatted: "18%",
      },
      investors: 127,
      location: "Lagos",
    },
    {
      id: "2003",
      property: "Lekki Phase 1 Apartments",
      type: "Residential",
      status: "Funded",
      funding_progress: {
        value: 85,
        formatted: "85%",
      },
      target_amount: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.0M",
      },
      raised_amount: {
        currency: "NGN",
        value: 42500000,
        formatted: "₦42.5M",
      },
      returns: {
        value: 15,
        unit: "percent",
        formatted: "15%",
      },
      investors: 127,
      location: "Lagos",
    },
    {
      id: "20034",
      property: "Abuja Mixed-Use Development",
      type: "Mixed-Use",
      status: "Active",
      funding_progress: {
        value: 85,
        formatted: "85%",
      },
      target_amount: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.0M",
      },
      raised_amount: {
        currency: "NGN",
        value: 42500000,
        formatted: "₦42.5M",
      },
      returns: {
        value: 20,
        unit: "percent",
        formatted: "20%",
      },
      investors: 127,
      location: "Lagos",
    },
    {
      id: "200342",
      property: "Ikoyi Luxury Residences",
      type: "Residential",
      status: "Active",
      funding_progress: {
        value: 85,
        formatted: "85%",
      },
      target_amount: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.0M",
      },
      raised_amount: {
        currency: "NGN",
        value: 42500000,
        formatted: "₦42.5M",
      },
      returns: {
        value: 17,
        unit: "percent",
        formatted: "17%",
      },
      investors: 127,
      location: "Lagos",
    },
    {
      id: "2003423",
      property: "Port Harcourt Shopping Mall",
      type: "Commercial",
      status: "Active",
      funding_progress: {
        value: 85,
        formatted: "85%",
      },
      target_amount: {
        currency: "NGN",
        value: 50000000,
        formatted: "₦50.0M",
      },
      raised_amount: {
        currency: "NGN",
        value: 42500000,
        formatted: "₦42.5M",
      },
      returns: {
        value: 18,
        unit: "percent",
        formatted: "18%",
      },
      investors: 127,
      location: "Lagos",
    },
  ];

  const columns: ColumnDef<PropertiesTableData>[] = [
    {
      accessorKey: "property",
      header: "property",
      cell: ({ row }) => {
        const location = row.original.location;
        return (
          <div className="">
            <p>{row.original.property} </p>
            <small className="text-gray-500 flex items-center gap-1">
              {" "}
              <MapPin className="w-3 h-3" /> <span> {location}</span>
            </small>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "type",
      cell: ({ row }) => <div className="">{row.original.type}</div>,
    },

    {
      accessorKey: "status",
      header: " status",
      cell: ({ row }) => {
        const status = row.original.status;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "funding",
      header: "funding",
      cell: ({ row }) => {
        const value = row.original.funding_progress.value;
        return (
          <div className=" flex items-center gap-2">
            <Progress
              value={value}
              className={cn(
                "rounded-sm bg-gray-200",
                value > 85 && "[&>div]:bg-green-500",
                value <= 85 && value > 75 && "[&>div]:bg-blue-500",
                value <= 75 && "[&>div]:bg-red-500",
                "[&>div]:transition-colors duration-300",
              )}
            />
            {row.original.funding_progress.formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "target",
      header: "target",
      cell: ({ row }) => (
        <div className="">{row.original.target_amount.formatted}</div>
      ),
    },
    {
      accessorKey: "raised",
      header: "raised",
      cell: ({ row }) => (
        <div className="">{row.original.raised_amount.formatted}</div>
      ),
    },

    {
      accessorKey: "returns",
      header: "returns",
      cell: ({ row }) => {
        return (
          <div className=" text-blue-600">{row.original.returns.formatted}</div>
        );
      },
    },
    {
      accessorKey: "investors",
      header: "invostors",
      cell: ({ row }) => {
        return <div className=" ">{row.original.investors}</div>;
      },
    },
    {
      accessorKey: "action",
      header: "action",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <>
            <InvestmentDetailsView>
              <Button variant={"outline"}>
                <Eye className="w-5 h-5" />
              </Button>
            </InvestmentDetailsView>
            <Link href={"/investments/" + id} className="flex lg:hidden">
              <Button variant={"outline"}>
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <ReUseAbleTable data={properties} columns={columns} />
    </div>
  );
}
