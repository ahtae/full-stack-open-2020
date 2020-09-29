export type Code =
  | 'M24.2'
  | 'M51.2'
  | 'S03.5'
  | 'J10.1'
  | 'J06.9'
  | 'J06.9'
  | 'Z57.1'
  | 'N30.0'
  | 'H54.7'
  | 'J03.0'
  | 'L60.1'
  | 'Z74.3'
  | 'L20'
  | 'F43.2'
  | 'S62.5'
  | 'H35.29';

export type Name =
  | 'Disorder of ligament'
  | 'Other specified intervertebral disc displacement'
  | 'Sprain and strain of joints and ligaments of other and unspecified parts of head'
  | 'Influenza with other respiratory manifestations, other influenza virus codeentified'
  | 'Acute upper respiratory infection, unspecified'
  | 'Occupational exposure to radiation'
  | 'Acute cystitis'
  | 'Unspecified visual loss'
  | 'Streptococcal tonsillitis'
  | 'Onycholysis'
  | 'Need for continuous supervision'
  | 'Atopic dermatitis'
  | 'Adjustment disorders'
  | 'Fracture of thumb'
  | 'Other proliferative retinopathy';

export type Latin =
  | 'Morbositas ligamenti'
  | 'Alia dislocatio disci intervertebralis specificata'
  | 'Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis'
  | 'Influenza cum aliis manifestationibus respiratoriis ab agente virali codeentificato'
  | 'Infectio acuta respiratoria superior non specificata'
  | 'Cystitis acuta'
  | 'Amblyopia NAS'
  | 'Tonsillitis (palatina) streptococcica'
  | 'Onycholysis'
  | 'Atopic dermatitis'
  | 'Perturbationes adaptationis'
  | 'Fractura [ossis/ossium] pollicis'
  | 'Alia retinopathia proliferativa';

export interface Diagnose {
  code: Code;
  name: Name;
  latin?: Latin;
}
