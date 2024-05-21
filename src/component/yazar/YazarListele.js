import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const YazarListele = () => {
    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    });

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid {...data} loading={loading} slots={{ toolbar: GridToolbar }} />
        </div>
    );
};

export default YazarListele;
