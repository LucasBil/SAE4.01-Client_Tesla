import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import CaracteristiquesController from "@/api/CaracteristiquesController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('CaracteristiquesControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL CARACTERISTIQUES
    it('GetAllCaracteristiquesOK', async () => {

    let caracteristiquesToCompare = [
        {
          "idCaracteristique": 1,
          "nomCaracteristique": "Accélération 0-100 km/h",
          "unite": " s",
          "description": null,
          "motorisationsNavigation": [],
          "caracteristiquesNavigation": []
        },
        {
          "idCaracteristique": 2,
          "nomCaracteristique": "Vitesse maximale",
          "unite": " km/h",
          "description": null,
          "motorisationsNavigation": [],
          "caracteristiquesNavigation": []
        },
        {
          "idCaracteristique": 3,
          "nomCaracteristique": "Autonomie",
          "unite": " km",
          "description": null,
          "motorisationsNavigation": [],
          "caracteristiquesNavigation": []
        },
    ];

    axios.get.mockResolvedValue({
        data: caracteristiquesToCompare,
    })

    let caracteristiques = await CaracteristiquesController.GetAll()
    caracteristiques = caracteristiques.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques')
    expect(caracteristiques).toStrictEqual(caracteristiquesToCompare)
    });

    // GET CARACTERISTIQUES BY ID
    it('GetByIdCaracteristiquesOK', async () => {

        const caracteristiquesMock = {
            "idCaracteristique": 1,
            "nomCaracteristique": "Accélération 0-100 km/h",
            "unite": " s",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }

        axios.get.mockResolvedValue({
            data: caracteristiquesMock,
        })

        const caracteristiquesbyid = await CaracteristiquesController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques/ById/1')
        expect(caracteristiquesbyid.data).toStrictEqual(caracteristiquesMock)

    });

    // GET CARACTERISTIQUES BY ID MOTORISATION
    it('GetByIdMotorisationOK', async () => {

        const caracteristiquesMock = [
            {
              "idCaracteristique": 1,
              "nomCaracteristique": "Accélération 0-100 km/h",
              "unite": " s",
              "description": null,
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 1,
                  "valeurCar": "3,2",
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 2,
              "nomCaracteristique": "Vitesse maximale",
              "unite": " km/h",
              "description": null,
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 2,
                  "valeurCar": "250",
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 3,
              "nomCaracteristique": "Autonomie",
              "unite": " km",
              "description": null,
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 3,
                  "valeurCar": "634",
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 4,
              "nomCaracteristique": "Groupe motopropulseur",
              "unite": null,
              "description": null,
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 4,
                  "valeurCar": "Transmission intégrale Dual Motor",
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 7,
              "nomCaracteristique": "Transmission Intégrale",
              "unite": null,
              "description": "La transmission intégrale Tesla utilise des moteurs avant et arrière indépendants pour des performances et performances et une motricité améliorées quelles que soient les conditions, avec une réactivité exceptionnelle de l’accélérateur. Contrairement aux moteurs traditionnels, les moteurs et le groupe motopropulseur Tesla ne nécessitent aucun entretien régulier pendant toute leur durée de vie.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 7,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 8,
              "nomCaracteristique": "Autopilot Standard",
              "unite": null,
              "description": "De série sur chaque Tesla, la fonction Autopilot permet à votre véhicule de maintenir une trajectoire, d’accélérer et de freiner automatiquement en fonction des autres véhicules et des piétons qui se trouvent dans sa voie. Les fonctionnalités avancées de sécurité et de confort sont conçues pour vous assister dans les moments les plus pénibles de la conduite, en plus des fonctions d'assistance conducteur telles que le freinage d'urgence, l'avertissement en cas de collision et la surveillance d'angle mort.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 8,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 9,
              "nomCaracteristique": "Recharge facile",
              "unite": null,
              "description": "Rechargez partout où il y a du courant. L'autonomie nécessaire pour la plupart des déplacements quotidiens peut être obtenue via le pack Connecteur Mobile et une simple prise domestique. Vous pouvez également opter pour un Wall Connector Tesla pour une recharge optimale à domicile. Pour les longs trajets, la Model 3 offre une autonomie de 275 kilomètres après seulement 15 minutes si vous la connectez au réseau Superchargeur Tesla, ce qui vous permet de reprendre la route plus rapidement.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 9,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 10,
              "nomCaracteristique": "Mode Sentinelle",
              "unite": null,
              "description": "Une fonction de protection exclusive, le mode Sentinelle, surveille en permanence les alentours du véhicule lorsque vous laissez votre Tesla sans surveillance. Lorsqu'il est activé, le mode Sentinelle arme et utilise les caméras externes du véhicule pour détecter et aider à le protéger contre les menaces potentielles, comme avec les systèmes d'alarme domestique.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 10,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 11,
              "nomCaracteristique": "Suspension adaptative",
              "unite": null,
              "description": "La suspension adaptative de la Model S réagit aux conditions routières et aux interventions du conducteur des centaines de fois par seconde pour offrir une qualité de conduite et une tenue de route exceptionnelles. En outre, le système ajuste automatiquement la hauteur de caisse pour plus de confort et pour conserver le réglage le plus aérodynamique de la Model S afin d'atteindre une autonomie maximale.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 11,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 12,
              "nomCaracteristique": "Vaste espace de stockage",
              "unite": null,
              "description": "La Model 3 dispose d'une capacité de chargement de 649 litres accessibles à la fois par le coffre avant et par le coffre arrière à ouverture et fermeture automatiques. Tirant parti de l'espace traditionnellement occupé par le moteur, les réservoirs et les transmissions, la conception de la Model 3 vous donne accès à un très vaste espace de rangement pour un véhicule de cette taille, tout en renforçant la sécurité des occupants grâce à une carrosserie et un châssis plus spacieux et plus solides.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 12,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            },
            {
              "idCaracteristique": 13,
              "nomCaracteristique": "Application mobile Tesla",
              "unite": null,
              "description": "Contrôlez et surveillez à distance votre Tesla grâce à différentes fonctionnalités dont la Clé sur téléphone, les indicateurs de niveau d’autonomie et de statut de recharge, la climatisation, la localisation GPS en direct et bien plus encore. Vous pouvez même programmer l'entretien et surveiller tout votre écosystème Tesla, y compris le bilan de puissance du Powerwall, du Solar Roof et des panneaux solaires.",
              "motorisationsNavigation": [
                {
                  "idMotorisation": 1,
                  "idCaracteristique": 13,
                  "valeurCar": null,
                  "motorisationNavigation": null,
                  "caracteristiqueNavigation": null
                }
              ],
              "accessoiresNavigation": []
            }
          ]

        axios.get.mockResolvedValue({
            data: caracteristiquesMock,
        })

        const caracteristiquesbyid = await CaracteristiquesController.GetByIdMotorisation(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques/ByIdMotorisation/1')
        expect(caracteristiquesbyid.data).toStrictEqual(caracteristiquesMock)

    });

    // GET caracteristique BY NAME
    it('GetByNameCaracteristiquesOK', async () => {

      const caracteristiqueMock = {
        "idCaracteristique": 1,
        "nomCaracteristique": "Accélération 0-100 km/h",
        "unite": " s",
        "description": null,
        "motorisationsNavigation": [],
        "caracteristiquesNavigation": []
      }

      axios.get.mockResolvedValue({
          data: caracteristiqueMock,
      })

      const caracteristiquebyname = await CaracteristiquesController.GetByName("Accélération 0-100 km/h")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques/ByName/Accélération 0-100 km/h')
      expect(caracteristiquebyname.data).toStrictEqual(caracteristiqueMock)

  });

    // POST caracteristique
    it('PostCaracteristiqueOK', async () => {

        const caracteristiqueToPost = {
            "idCaracteristique": -1,
            "nomCaracteristique": "Test",
            "unite": " hop",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }

        const caracteristiquePostMock = {
            "idCaracteristique": -1,
            "nomCaracteristique": "Test",
            "unite": " hop",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }

        axios.post.mockResolvedValue({
            data:caracteristiquePostMock
        })

        const newCaracteristique = await CaracteristiquesController.Post(caracteristiqueToPost)

        console.log('mock')
        console.log(caracteristiquePostMock)

        console.log('real')
        console.log(newCaracteristique.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques',caracteristiqueToPost)
        expect(newCaracteristique.data).toStrictEqual(caracteristiquePostMock)
    });

    // Put MODELE
    it('PutCaracteristiqueOK', async () => {

        const caracteristiqueToPut = {
            "idCaracteristique": 1,
            "nomCaracteristique": "Accélération 0-100 km/h",
            "unite": " sec",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }
        
        const caracteristiquePutMock = {
            "idCaracteristique": 1,
            "nomCaracteristique": "Accélération 0-100 km/h",
            "unite": " sec",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }

        axios.put.mockResolvedValue({
            data:caracteristiquePutMock
        })
        
        const newCaracteristique = await CaracteristiquesController.Put(1,caracteristiqueToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques/1',caracteristiqueToPut)
        expect(newCaracteristique.data).toStrictEqual(caracteristiquePutMock)
    });

    // DELETE caracteristique
    it('DeletecaracteristiqueOK', async () => {

        const caracteristiqueToDelete = {
            "idCaracteristique": 1,
            "nomCaracteristique": "Accélération 0-100 km/h",
            "unite": " s",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }
        
        const caracteristiqueDeleteMock = {
            "idCaracteristique": 1,
            "nomCaracteristique": "Accélération 0-100 km/h",
            "unite": " s",
            "description": null,
            "motorisationsNavigation": [],
            "caracteristiquesNavigation": []
          }

        axios.delete.mockResolvedValue({
            data:caracteristiqueDeleteMock
        })

        const newCaracteristique = await CaracteristiquesController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/caracteristiques/1')
        expect(newCaracteristique.data).toStrictEqual(caracteristiqueToDelete)
    });


});