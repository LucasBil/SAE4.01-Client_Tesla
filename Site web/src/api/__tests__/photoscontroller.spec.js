import { describe, it, expect, assert, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest'
import photosController from "@/api/photosController";
import { ref } from "vue";
import { shallowMount} from '@vue/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { data } from 'autoprefixer';

vi.mock('axios')

describe('PhotosControllerTests', () => {
    beforeEach(() => {
        axios.get.mockReset()
      })
    
    // GET ALL MODELES
    it('GetAllPhotosOK', async () => {

    let photosToCompare = [
        {
            "idPhoto": 1,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        },
        {
            "idPhoto": 2,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modele3_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modele3_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modele3_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modele3_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modele3_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        },
        {
            "idPhoto": 3,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleX_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleX_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleX_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleX_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleX_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        },
      ];

    axios.get.mockResolvedValue({
        data: photosToCompare,
    })

    let photos = await photosController.GetAll()
    photos = photos.data.slice(0,3)

    expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos')
    expect(photos).toStrictEqual(photosToCompare)
    });

    // GET MODELE BY ID
    it('GetByIdMotorisationOK', async () => {

        const motorisationMock = {
            "idPhoto": 1,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }

        axios.get.mockResolvedValue({
            data: motorisationMock,
        })

        const motorisationbyid = await photosController.GetById(1)

        expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos/ById/1')
        expect(motorisationbyid.data).toStrictEqual(motorisationMock)

    });

    // GET MODELE BY NAME
    it('GetByNamephotosOK', async () => {

      const photosMock = {
        "idPhoto": 1,
        "nomCouleur": "Blanc",
        "codeHexa": "#FFFFFF",
        "url": [
            "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
            "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
            "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
            "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
            "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
        ],
        "photoToOPM": null,
        "photoToVariantes": null
    }

      axios.get.mockResolvedValue({
          data: photosMock,
      })

      const photosbyname = await photosController.GetByName("Blanc")

      expect(axios.get).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos/ByName/Blanc')
      expect(photosbyname.data).toStrictEqual(photosMock)

  });

    // POST MODELE
    it('PostPhotosOK', async () => {

        const photosToPost = {
            "nomCouleur": "Test",
            "codeHexa": "#XXXXXX",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }

        const photosPostMock = {
            "nomCouleur": "Test",
            "codeHexa": "#XXXXXX",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }

        axios.post.mockResolvedValue({
            data:photosPostMock
        })

        const newModele = await photosController.Post(photosToPost)

        console.log('mock')
        console.log(photosPostMock)

        console.log('real')
        console.log(newModele.data)

        expect(axios.post).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos',photosToPost)
        expect(newModele.data).toStrictEqual(photosPostMock)
    });

    // Put MODELE
    it('PutPhotosOK', async () => {

        const modeleToPut = {
            "idPhoto": 1,
            "nomCouleur": "Test",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }
        
        const modelePutMock = {
            "idPhoto": 1,
            "nomCouleur": "Test",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }

        axios.put.mockResolvedValue({
            data:modelePutMock
        })
        
        const newModele = await photosController.Put(1,modeleToPut)
        
        expect(axios.put).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos/1',modeleToPut)
        expect(newModele.data).toStrictEqual(modelePutMock)
    });

    // DELETE MODELE
    it('DeleteModeleOK', async () => {

        const modeleToDelete = {
            "idPhoto": 1,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }
        
        const modeleDeleteMock = {
            "idPhoto": 1,
            "nomCouleur": "Blanc",
            "codeHexa": "#FFFFFF",
            "url": [
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_1.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_2.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_3.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_4.jpg",
                "51.83.36.122:8081/src/sae401/img/motorisation/motorisation_modeleS_5.jpg"
            ],
            "photoToOPM": null,
            "photoToVariantes": null
        }

        axios.delete.mockResolvedValue({
            data:modeleDeleteMock
        })

        const newModele = await photosController.Delete(1)
        
        
        expect(axios.delete).toHaveBeenCalledWith('https://api-tesla-v2.azurewebsites.net/api/photos/1')
        expect(newModele.data).toStrictEqual(modeleToDelete)
    });


});