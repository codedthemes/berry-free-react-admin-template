import EnviosStickyHeadTable from './Envios';
import SRows from './data/envios-list-linhas';
import SColumns from './data/envios-list-columns';

const Envios = () => {
    return (
        <>
            <EnviosStickyHeadTable rows={SRows} columns={SColumns} />
        </>
    );
};

export default Envios;
