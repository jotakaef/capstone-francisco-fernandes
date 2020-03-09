import React, {useEffect, useState} from "react";
import HeaderComponent from "./template/HeaderComponent";
import Quagga from "quagga";
import Button from "@material-ui/core/Button";
import AuthenticationService from "../../api/AuthenticationService";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {FontAwesomeBarCode} from "./template/MenuItems";
import LocationService from "../../api/LocationService";
import ProductService from "../../api/ProductsService";
import ProductLocationsService from "../../api/ProductLocationsService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import useStyles from "./util/StyleComponent";

export default function Scan() {
    const classes = useStyles();
    const [productScans, setProductScans] = useState([]);
    const [ret, setRet] = useState({});
    const [locations, setLocations] = useState([]);
    const [locationProducts, setLocationProducts] = useState([]);
    const [qty, setQty] = useState(0);
    const [isQuaggaInit, setIsQuaggaInit] = useState(false);
    const [location, setLocation] = React.useState({});
    const regexp = new RegExp(`^-?[0-9]*$`);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
    const [messageOpen, setMessageOpen] = React.useState(false);

    const handleMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageOpen(false);
    };

    useEffect(() => {
        LocationService.getAllLocationScan().then(
            response => {
                setLocations(response.data);
            }
        );
    }, []);

    function getProductsByLocation(locationSelected) {
        setLocation(locationSelected);

        ProductLocationsService.getProductLocationsByLocation(locationSelected.id).then(
            response => {
                setLocationProducts(response.data);
            }
        );
    }

    function addRemoveQtyClick(howMany) {
        if ((howMany < 0 && qty > 0) || howMany > 0)
            setQty(qty + howMany);
    }

    function searchProduct() {
        ProductService.getProductFromCode(productScans).then(
            response => {
                console.log(response.data);
            }
        );
    }

    function checkProductExists(barcode) {
        locationProducts.forEach(value => {
            if (barcode === value.numBarcode) {
                return value;
            }
        });

        return undefined;
    }

    function sendInventoryCount() {
        console.log(ret);
        console.log(buildProductObj(ret));
        searchProduct();
    }

    function buildProductObj(product) {
        let productScan = productScans.find(value => value.numBarcode === product.numBarcode);

        if (productScan !== undefined) {
            productScan.date = new Date();
            productScan.qty = qty;
            console.log(productScan);
        } else {
            productScans.push({
                numBarcode: product.numBarcode,
                date: new Date(),
                username: AuthenticationService.getLoggedInUserName(),
                locationId: location.id,
                qty: qty
            });
        }

        console.log(productScans);
    }

    function initQuaggaScan() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'),  // Or '#yourElement' (optional)
                constraints: {
                    width: 600,
                    height: 480,
                    facingMode: "environment",
                    aspectRatio: {min: 1, max: 50},
                    deviceId: "7832475934759384534"
                }
            },
            locator: {
                patchSize: "large",
                halfSample: true
            },
            numOfWorkers: 4,
            decoder: {
                readers: ["code_39_reader", "ean_reader"]
            },
            locate: true,
            multiple: false
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            document.querySelector("#interactive").style.display = '';
            Quagga.start();
        });

        if (!isQuaggaInit) {

            Quagga.onProcessed(function (result) {
                let drawingCtx = Quagga.canvas.ctx.overlay,
                    drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    if (result.boxes) {
                        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                        result.boxes.filter(function (box) {
                            return box !== result.box;
                        }).forEach(function (box) {
                            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                        });
                    }

                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                    }

                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {
                            color: 'red',
                            lineWidth: 3
                        });
                    }
                }
            });

            Quagga.onDetected((result) => {
                Quagga.stop();
                Quagga.offDetected((res) => {
                    console.log(res)
                });
                document.querySelector("#interactive").style.display = 'none';
                let product = checkProductExists(result.codeResult.code);

                if (product === undefined) {
                    setMessageInfo("This Product was not found on this location!");
                    setMessageOpen(true);
                } else {
                    setRet(product);
                    console.log(buildProductObj(result.codeResult.code));
                    searchProduct();
                }
            });

            setIsQuaggaInit(true);
        }
    }

    return (
        <div className={classes.root}>
            <HeaderComponent title={"Scan"}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>


                <Autocomplete
                    className={classes.padding}
                    id="selLocation"
                    getOptionLabel={option => option.description}
                    options={locations}
                    onChange={(event, value) => getProductsByLocation(value)}
                    renderInput={params => (
                        <TextField {...params} label="Location" variant="outlined" fullWidth/>
                    )}
                />

                <TableContainer className={classes.padding}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="center">Barcode</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {locationProducts.map(product => (
                                <TableRow key={product.idProduct}>
                                    <TableCell component="th" scope="row" align="right">
                                        {product.numProductCode}
                                    </TableCell>
                                    <TableCell align="center">{product.numBarcode}</TableCell>
                                    <TableCell align="right">{product.qtyOriginal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Grid container spacing={1} direction="row" className={classes.padding} alignItems="center">
                    <Grid item xs>
                        <Autocomplete
                            id="product"
                            getOptionLabel={option => option.numBarcode === undefined ? "" : option.numBarcode}
                            options={locationProducts}
                            value={ret}
                            onChange={(event, value) => setRet(value)}
                            renderInput={params => (
                                <TextField {...params} label="Product" variant="outlined" fullWidth/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={initQuaggaScan}
                            size="large"
                            fullWidth={true}
                            startIcon={<FontAwesomeBarCode/>}
                        >
                            Scan
                        </Button>
                    </Grid>
                </Grid>

                <div id={"interactive"} className={"viewport"}
                     style={{width: "100%", padding: "15px", display: "none"}}>
                </div>


                <Grid container spacing={0} direction="row" alignItems="center" className={classes.padding}>
                    <Grid item xs={2}>
                        <IconButton color="secondary" variant="contained"
                                    onClick={() => {
                                        addRemoveQtyClick(-1)
                                    }}
                        >
                            <RemoveCircleIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField label="Quantity" variant="filled" value={qty}
                                   style={{width: "100%", paddingLeft: "5px", paddingRight: "15px"}}
                                   onChange={e => {
                                       const newValue = e.target.value;
                                       if (regexp.test(newValue)) {
                                           setQty(parseInt(newValue))
                                       }
                                   }} className={classes.margin}/>
                    </Grid>

                    <Grid item xs={2}>
                        <IconButton color="primary" variant="contained"
                                    onClick={() => {
                                        addRemoveQtyClick(1)
                                    }}
                        >
                            <AddCircleIcon fontSize="large"/>
                        </IconButton>
                    </Grid>

                </Grid>

                <Fab color="primary" aria-label="Done" className={classes.fab} onClick={sendInventoryCount}>
                    <DoneIcon/>
                </Fab>

                <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleMessageClose}>
                    <Alert onClose={handleMessageClose} severity="warning">
                        {messageInfo}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    )
}
