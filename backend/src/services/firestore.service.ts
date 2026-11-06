import { db } from '../config/firebase';
import { CulturalArtifact } from '@prj-van-hoa/shared';

export class FirestoreService {
  private static artifactCol = 'artifacts';
  private static siteCol = 'heritage_sites';

  // --- Artifacts ---
  static async getAllArtifacts(category?: string, limit: number = 20) {
    let query: FirebaseFirestore.Query = db.collection(this.artifactCol);
    if (category) {
      query = query.where('category', '==', category);
    }
    const snapshot = await query.limit(limit).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CulturalArtifact));
  }

  static async getArtifactById(id: string) {
    const doc = await db.collection(this.artifactCol).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as CulturalArtifact;
  }

  static async getArtifactByCode(code: string) {
    const snapshot = await db.collection(this.artifactCol).where('code', '==', code).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as CulturalArtifact;
  }

  static async createArtifact(data: Omit<CulturalArtifact, 'id'>) {
    const docRef = await db.collection(this.artifactCol).add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...data };
  }

  // --- Heritage Sites ---
  static async getAllSites(limit: number = 50) {
    const snapshot = await db.collection(this.siteCol).limit(limit).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getSiteById(id: string) {
    const doc = await db.collection(this.siteCol).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async createSite(data: any) {
    const docRef = await db.collection(this.siteCol).add({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...data };
  }
}
