import React from 'react';
import DataTable, { DataTableProps } from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
// import 'datatables.net-bs5';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-select-bs5';

const DataTableComponent = ({tableHead,dataTableProps}:{tableHead:string[], dataTableProps:DataTableProps})=>{
// console.log(tableHead)
DataTable.use(DT);
 
return (
    <DataTable
        className="display"
       {...dataTableProps}
    >
        <thead>
            <tr>
              {tableHead?.map((th:string,i:number)=><th key={i}>{th}</th>)}  
            </tr>
        </thead>
    </DataTable>
);
}

export default React.memo(DataTableComponent)