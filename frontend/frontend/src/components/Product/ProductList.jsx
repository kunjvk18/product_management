import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@material-ui/core';
import { DeleteOutline, Edit, Padding } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #3f51b5',
        borderRadius: '10px',
        boxShadow: '0 0 8px 7px #00000012',
    },
    cardMedia: {
        paddingTop: '56.25%',
        width: '100%',
        height: "100%"
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        boxSizing: "border-box"
    },
    cardAction: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: "border-box",
        padding: '20px',
        gap: '10px',
    },
    editButton: {
        border: '1px solid #3f51b5',
        color: '#3f51b5',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 15px',
    },
    deleteButton: {
        border: '1px solid #f50057',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 15px',
    },
    icon: {
        marginRight: "5px"
    }
}));

const ProductList = ({ products, role, handleDeleteProduct }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={4} className={classes.root}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={product.logo}
                            title={product.name}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2" align='center'>
                                {product.name}
                            </Typography>
                            <Typography>{product.description}</Typography>
                            <Typography variant="body1" color="textSecondary">
                                SKU: <b>{product.sku}</b>
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Category: <b>{product.category}</b>
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Source: <b>{product.source}</b>
                            </Typography>
                        </CardContent>
                        {role && role.includes('admin') && <CardActions className={classes.cardAction}>
                            <Button className={classes.editButton} size="small" color="primary" onClick={() => alert("coming soon")}>
                                <Edit className={classes.icon} fontSize='small' /> Edit
                            </Button>
                            <Button className={classes.deleteButton} size="small" color="secondary" onClick={() => handleDeleteProduct(product._id)}>
                                < DeleteOutline className={classes.icon} fontSize='small' />   Delete
                            </Button>
                        </CardActions>}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;