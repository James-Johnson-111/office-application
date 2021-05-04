const ComponentToPrint = ( props ) => {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <img src={props.response} width="100%" />
                </div>
                <div className="col-6 text-center d-grid">
                    <div>
                        <h5 className="text-uppercase font-weight-bold">Labofficial</h5>
                        <h4 className="text-uppercase font-weight-bold" style={{ 'fontFamily': 'Exo', 'fontSize': '40px' }}>{props.tokenTXT}</h4>
                        <h6 className="text-uppercase font-weight-bold" style={{ 'fontFamily': 'Exo' }}> {props.fullTime} </h6>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ComponentToPrint;