import { AppBar, Button, Container, Grid, Toolbar, Typography, Card, CardMedia, CardContent, CardActions, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import db from '../../db.json';
export const Main = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState({})
  return (
    <Container maxWidth="sm">
      <Button size="small">
        {t('btn_get_guide')}
      </Button>
      <Grid container spacing={2} justify="center">

        {Object.keys(db.weapons).map((el, i) => {
          const obj = db.weapons[el]

          return (<Grid key={i} item xs={12} sm={6} md={4} >
            <Card >
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  {el}
                </Typography>
              </CardContent>
              <CardActions>

                <Checkbox value={selected[el] || false} color="primary" onClick={() => setSelected({ ...selected, el: !selected[el] })} ></Checkbox>
              </CardActions>
            </Card>
          </Grid>)
        })}

      </Grid>
    </Container>
  );
}
