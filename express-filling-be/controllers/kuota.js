import Kuota from "../models/KuotaModel.js";


// Create a new kuota
export const createKuota = async (req, res) => {
    try {
      const { workshop_id, total, sisa, terjual } = req.body;
      const newKuota = await Kuota.create({ workshop_id, total, sisa, terjual });
      res.status(201).json(newKuota);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create kuota' });
    }
  };

// Get all kuota
export const getAllKuota = async (req, res) => {
    try {
      const kuotaList = await Kuota.findAll();
      res.status(200).json(kuotaList);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch kuota' });
    }
  };

  
  // Get a single kuota by ID
  export const getKuotaById = async (req, res) => {
    try {
      const { id } = req.params;
      const kuota = await Kuota.findByPk(id);
      if (kuota) {
        res.status(200).json(kuota);
      } else {
        res.status(404).json({ message: 'Kuota not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch kuota' });
    }
  };
  

  // Update a kuota by ID
  export const updateKuotaById = async (req, res) => {
    try {
      const { id } = req.params;
      const { workshop_id, total, sisa, terjual } = req.body;
      const kuotaToUpdate = await Kuota.findByPk(id);
      if (kuotaToUpdate) {
        kuotaToUpdate.workshop_id = workshop_id;
        kuotaToUpdate.total = total;
        kuotaToUpdate.sisa = sisa;
        kuotaToUpdate.terjual = terjual;
        await kuotaToUpdate.save();
        res.status(200).json(kuotaToUpdate);
      } else {
        res.status(404).json({ message: 'Kuota not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update kuota'})
    }
}


export const deleteKuotaById = async (req, res) => {
    try {
      const { id } = req.params;
      const kuotaToDelete = await Kuota.findByPk(id);
      if (kuotaToDelete) {
        await kuotaToDelete.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Kuota not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete kuota' });
    }
  };