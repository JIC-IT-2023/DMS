import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { SvgIcon, Button, Paper, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Grid, } from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { styled } from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FormDialog() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    const useStyles = styled((theme) => ({
        button: {
            marginRight: theme.spacing(1),
        },
    }));


    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [uploadedFile, setUploadedFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        setUploadedFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, application/pdf', // Accepts image and PDF files
        multiple: false,
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            submit: null
        },
        // validationSchema: Yup.object({
        //   email: Yup
        //     .string()
        //     .email('Must be a valid email')
        //     .max(255)
        //     .required('Email is required'),
        //   name: Yup
        //     .string()
        //     .max(255)
        //     .required('Name is required'),
        //   password: Yup
        //     .string()
        //     .max(255)
        //     .required('Password is required')
        // }),
        onSubmit: async (values, helpers) => {
            try {
                await auth.signUp(values.email, values.name, values.password);
                router.push('/');
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    return (
        <div>
            <Button
                startIcon={(
                    <SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>
                )}
                variant="contained"
                onClick={handleClickOpen}
            >
                Add Documents
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" PaperProps={{ style: { position: 'absolute', top: 0 } }}>
                <DialogTitle>Add Document</DialogTitle>
                <DialogContent>
                    <br />
                    <Grid container spacing={isMobileView ? 0 : 6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={!!(formik.touched.text && formik.errors.text)}
                                fullWidth
                                helperText={formik.touched.text && formik.errors.text}
                                label="Document Name"
                                name="document"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.text}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={!!(formik.touched.email && formik.errors.email)}
                                fullWidth
                                helperText={formik.touched.email && formik.errors.email}
                                label="Email Address"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="email"
                                // size="small"
                                value={formik.values.email}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={!!(formik.touched.date && formik.errors.date)}
                                fullWidth
                                helperText={formik.touched.date && formik.errors.date}
                                label="Expiry (Optional)"
                                name="date"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="date"
                                // size="small"
                                value={formik.values.date}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={!!(formik.touched.text && formik.errors.text)}
                                fullWidth
                                helperText={formik.touched.text && formik.errors.text}
                                label="Specify Category"
                                name="category"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.text}
                            />
                        </Grid>
                    </Grid>
                    <Box textAlign="center" mt={4} >
                        <Paper
                            elevation={3}
                            {...getRootProps()}
                            style={{ cursor: 'pointer', padding: '20px', backgroundColor: '#EDF0F6', border: '2px dashed #99A7BF' }}
                        >
                            <input {...getInputProps()} />
                            <CloudUploadIcon fontSize="large" />
                            <p>Drag &amp; drop an image or PDF here, or click to select one</p>
                        </Paper>
                        {uploadedFile && (
                            <Box mt={2} >
                                <p>Uploaded File: {uploadedFile.name}</p>
                                {uploadedFile.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(uploadedFile)}
                                        alt="Uploaded"
                                        style={{ maxWidth: '100%' }}
                                    />
                                ) : (
                                    <iframe
                                        src={URL.createObjectURL(uploadedFile)}
                                        title="Uploaded PDF"
                                        style={{ width: '100%', height: '500px' }}
                                    />
                                )}
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained">Submit</Button>
                    {/* <Button onClick={handleClose}>Subscribe</Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}