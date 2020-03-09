import React, {useState} from "react";
import HeaderComponent from "./template/HeaderComponent";
import useStyles from "./util/StyleComponent";
import Button from "@material-ui/core/Button";
import InventoryCountService from "../../api/InventoryCountService";
import Grid from "@material-ui/core/Grid";
import {Input} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";


function InventoryCount() {
    const [fileName, setFileName] = useState("");
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
        [classes.buttonError]: error,
    });

    const onUpload = (event) => {
        let file = event.target.files[0];
        const data = new FormData();

        setFileName(file.name);
        data.append("file", file);

        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }

        InventoryCountService.uploadXlsSheetFile(data).then(response => {
            console.log(response);
            setSuccess(true);
            setLoading(false);
            setError(false);
        }).catch(reason => {
            setSuccess(false);
            setLoading(false);
            setError(true);
            console.log(reason);
        });

        // allows the user to upload again after the first try
        event.target.value = "";
    }

    return (
        <div className={classes.root}>
            <HeaderComponent title={"Inventory Count"}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>

                <Grid container spacing={1} direction="row" className={classes.padding} alignItems="center">
                    <Grid item xs>
                        <Input
                            id="file-name"
                            disabled
                            value={fileName}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <input
                            accept=".xlsx, .xls, .csv"
                            className={classes.input}
                            id="inventoryCountUpload"
                            type="file"
                            onChange={event => onUpload(event)}
                        />
                        <label htmlFor="inventoryCountUpload">
                            <div className={classes.wrapper}>
                                <Button variant="contained" color="primary" component="span" className={buttonClassname}
                                        disabled={loading}>
                                    Upload
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </label>


                    </Grid>
                </Grid>


            </main>
        </div>
    )
}


export default InventoryCount;
