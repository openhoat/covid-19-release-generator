# Générateur d'attestation de déplacement COVID-19

Ce générateur à vocation pédagogique est basé sur le [générateur officiel](https://github.com/LAB-MI/deplacement-covid-19), mais ne nécessite pas d'IHM.

Les informations du formulaire sont soumises directement sous la forme de paramètres de requête, la réponse à la requête est l'attestation générée au format PDF.

## Utilisation

```sh
$ http --download localhost:3000 \
  'firstname==John' \
  'lastname==Doe' \
  'birthday==02/03/1994' \
  'birthplace==Paris' \
  'address==1 rue du professeur Tournesol' \
  'zipcode==75011' \
  'town==Paris' \
  'reasons==sport'
```

## Liste des paramètres

- firstname : prénom
- lastname : nom
- birthday : date de naissance
- birthplace : lieu de naissance
- address : adresse
- zipcode : code postal
- town : ville
- releaseDate : date de sortie (par défaut : date courante)
- releaseTime : heure de sortie (par défaut : heure courante)

## Liste des raisons de sortie

- travail

    > Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu'ils sont indispensables à l'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.
 
- courses

    > Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées (liste des commerces et établissements qui restent ouverts).

- sante

    > Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une affection de longue durée.

- famille

    > Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.

- sport

    > Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.

- judiciaire

    > Convocation judiciaire ou administrative.

- missions

    > Participation à des missions d’intérêt général sur demande de l’autorité administrative.

Enjoy !
