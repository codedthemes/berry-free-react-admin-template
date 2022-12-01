import * as React from 'react';
import Progressbar from 'ui-component/commonComponent/RegionProgressBar';
import MUIDataTable from 'mui-datatables';

const RegionTable = (props) => {
	const columns = [
		{
			name: 'id',
			label: 'ID',
			options: {
				setCellProps: () => ({ style: { width: '30px' } })
			}
		},
		{
			name: 'name',
			label: '지역명',
			options: {
				setCellProps: () => ({ style: { width: '20px', paddingLeft: '10px' } })
			}
		},
		{
			name: 'lastTime',
			label: '지난시간 방문자',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].lastTime;
					}
					return <Progressbar data={value} thisValue={value} total={'전체' + val} totalData={val} />;
				}
			}
		},
		{
			name: 'visit',
			label: '방문자',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].visit;
					}
					return <Progressbar data={value} thisValue={value} total={'전체' + val} totalData={val} />;
				}
			}
		},
		{
			name: 'stay',
			label: '체류시간 평균',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].stay;
					}
					return (
						<Progressbar
							data={value}
							thisValue={value > 59 ? parseInt(value / 60) + '시간' + (value % 60) + '분' : value + '분'}
							total={val > 59 ? parseInt(val / 60) + '시간' + (val % 60) + '분' : val + '분'}
							totalData={val}
						/>
					);
				}
			}
		},
		{
			name: 'revisit',
			label: '재방문자',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value, event) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].revisit;
					}
					console.log(event.rowData[0]);
					return <Progressbar data={value} thisValue={value} total={event.rowData[0] + ' 방문자수' + val} totalData={val} />;
				}
			}
		},
		{
			name: 'monthly',
			label: '월간 방문자',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].monthly;
					}
					return <Progressbar data={value} thisValue={value} total={'전체' + val} totalData={val} />;
				}
			}
		},
		{
			name: 'yearly',
			label: '연간 방문자',
			options: {
				setCellProps: () => ({ style: { width: '200px' } }),
				customBodyRender: (value) => {
					var val = 0;
					for (var i = 0; i < props.Dummy.length; i++) {
						val += props.Dummy[i].yearly;
					}
					return <Progressbar data={value} thisValue={value} total={'전체' + val} totalData={val} />;
				}
			}
		}
	];

	const options = {
		filterType: 'dropdown',
		responsive: 'scrollFullHeight',
		rowsPerPage: 7,
		selectableRows: false
	};

	return <MUIDataTable data={props.Dummy} columns={columns} options={options} />;
};

export default RegionTable;
