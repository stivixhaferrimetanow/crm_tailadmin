'use client';
import { Card, DonutChart, List, ListItem } from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    name: 'Travel',
    cost: 6730,
    percentage: '32.1%',
   
  },
  {
    name: 'IT & equipment',
    cost: 4120,
    percentage: '19.6%',
   
  },
  {
    name: 'Training & development',
    cost: 3920,
    percentage: '18.6%',
  
  },
  {
    name: 'Office supplies',
    cost: 3210,
    percentage: '15.3%',

  },
  {
    name: 'Communication',
    cost: 3010,
    percentage: '14.3%',
   
  },
];

const currencyFormatter = (number) => {
  return '€' + Intl.NumberFormat('us').format(number).toString();
};

export default function WarehouseChart({warehousedata , sum}) {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg shadow-lg rounded-lg">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Warehouse Data
        </h3>
        <DonutChart
          className="mt-8"
          data={warehousedata}
          category="amount"
          index="name"
          valueFormatter={currencyFormatter}
          showTooltip={false}
          colors={['cyan', 'blue', 'indigo', 'violet', 'fuchsia']}
        />
        <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
          <span>Supplier</span>
          <span>Cost / {sum && sum} €</span>
        </p>
        <List className="mt-2">
          {warehousedata && warehousedata.map((item) => (
            <ListItem key={item.supplier} className="space-x-6">
              <div className="flex items-center space-x-2.5 truncate">
                <span
                  className='h-2.5 w-2.5 shrink-0 rounded-sm bg-red-500'
                  aria-hidden={true}
                />
                <span className="truncate dark:text-dark-tremor-content-emphasis">
                  {item.supplier}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium tabular-nums text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {currencyFormatter(item.totalCost)}
                </span>
                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}