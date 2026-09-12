import { EquipmentTool } from '../types';

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speechCode: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文 (简体)', flag: '🇨🇳', speechCode: 'zh-CN' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speechCode: 'ja-JP' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speechCode: 'fr-FR' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', speechCode: 'pt-BR' },
];

export const MULTILINGUAL_TOOLS: EquipmentTool[] = [
  {
    id: 'hermle-5axis',
    name: 'Hermle C42U 5-Axis CNC Milling Center',
    category: 'Precision Machining',
    difficulty: 'Advanced Master',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    associatedWorkerIds: ['w-1'],
    workplaceIds: ['wp-1', 'wp-5'],
    translations: {
      en: {
        languageCode: 'en',
        languageName: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        localizedName: 'Hermle C42U 5-Axis CNC Milling Center',
        tagline: 'Sub-micron multi-axis subtractive machining for aerospace and titanium chassis.',
        overview: 'The 5-axis CNC mill simultaneously translates in X, Y, and Z axes while swiveling and rotating on A and C trunnion axes. This eliminates multiple fixture setups and allows cutting intricate organic geometries with optical mirror surface finishes.',
        safetyProtocols: [
          'Verify door interlock safety switches and polycarbonate shield before spindle activation.',
          'Always verify tool length offset and workpiece zero (G54-G59) with mechanical edge finders or Renishaw touch probe.',
          'Confirm flood coolant concentration and chip conveyor clear of obstructions.',
          'Keep your hand resting near the red Emergency Stop (E-Stop) during initial cycle start dry-run.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Workpiece Fixturing', desc: 'Mount stock in 5-axis self-centering vise and torque to 80 Nm.' },
          { step: 2, title: 'Probe WCS Zero', desc: 'Deploy optical touch probe to establish G54 datum on workpiece center.' },
          { step: 3, title: 'Load Tool Carousel', desc: 'Inspect carbide end mills, measure stick-out, and verify tool table offsets.' },
          { step: 4, title: 'Dry Run & Execute', desc: 'Run at 5% feed override above Z-clearance plane before engaging raw stock.' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'Spindle', phonetic: 'ˈspɪn.dəl', definition: 'High-speed rotating motor shaft holding the cutting tool collet.' },
          { term: 'Feed Rate', translation: 'Feed Rate', phonetic: 'fiːd reɪt', definition: 'The linear velocity at which the cutting tool advances through the material (mm/min or in/min).' },
          { term: 'G-Code', translation: 'G-Code', phonetic: 'dʒiː koʊd', definition: 'Standardized numerical control programming language dictating machine kinematics.' },
          { term: 'Backlash', translation: 'Backlash', phonetic: 'ˈbæk.læʃ', definition: 'Clearance or lost motion between ball screws and machine slides.' }
        ],
        quizQuestion: {
          question: 'What is the primary operational advantage of 5-axis machining over traditional 3-axis mills?',
          options: [
            'It can cut softer materials only',
            'It machines complex compound angles in a single setup without re-clamping',
            'It does not require cooling liquid',
            'It runs without any computer software'
          ],
          correctIndex: 1,
          explanation: '5-axis machines rotate on A and C axes simultaneously, eliminating re-fixturing errors and allowing continuous multi-surface tool contact.'
        }
      },
      es: {
        languageCode: 'es',
        languageName: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        localizedName: 'Centro de Mecanizado CNC de 5 Ejes Hermle C42U',
        tagline: 'Mecanizado sustractivo multieje de precisión submicrónica para aleaciones aeroespaciales.',
        overview: 'El centro CNC de 5 ejes traslada simultáneamente en los ejes X, Y y Z mientras rota en los ejes basculantes A y C. Esto suprime la necesidad de múltiples amarres de pieza, permitiendo esculpir geometrías complejas con acabados especulares.',
        safetyProtocols: [
          'Verifique los interruptores de enclavamiento de puerta y el blindaje antes del husillo.',
          'Compruebe siempre la compensación de longitud de herramienta y el cero pieza (G54-G59) con la sonda Renishaw.',
          'Inspeccione la mezcla de refrigerante soluble y que el extractor de virutas esté libre.',
          'Mantenga la mano cerca de la parada de emergencia roja (Parada E-Stop) durante la primera pasada.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Amarre de Pieza', desc: 'Fije el bloque en la mordaza autocentrante de 5 ejes y aplique un par de 80 Nm.' },
          { step: 2, title: 'Palpado de Cero', desc: 'Despliegue la sonda óptica para determinar el origen G54 en el centro geométrico.' },
          { step: 3, title: 'Carga de Herramientas', desc: 'Inspeccione las fresas de carburo de tungsteno y registre las longitudes en la tabla.' },
          { step: 4, title: 'Prueba en Vacío', desc: 'Ejecute el programa al 5% de avance por encima del plano de seguridad Z.' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'Husillo Principal', phonetic: 'uˈsi.ʎo pɾin.siˈpal', definition: 'Eje motor rotativo de alta velocidad que sujeta la pinza portafresas.' },
          { term: 'Feed Rate', translation: 'Velocidad de Avance', phonetic: 'be.lo.siˈðað ðe aˈβan.se', definition: 'Velocidad lineal con la que avanza el filo cortante en la materia prima.' },
          { term: 'G-Code', translation: 'Código G', phonetic: 'ˈko.ði.ɣo xe', definition: 'Lenguaje estandarizado de control numérico que dicta la trayectoria cinemática.' },
          { term: 'End Mill', translation: 'Fresa Cilíndrica', phonetic: 'ˈfɾe.sa siˈlin.dɾi.ka', definition: 'Herramienta de corte giratoria con filos laterales y frontales.' }
        ],
        quizQuestion: {
          question: '¿Cuál es la ventaja primordial del mecanizado de 5 ejes frente a las fresadoras de 3 ejes?',
          options: [
            'Solo puede mecanizar plásticos blandos',
            'Permite mecanizar ángulos complejos en una sola sujeción sin recolocar la pieza',
            'No necesita lubricante de corte',
            'Funciona sin ningún programa informático'
          ],
          correctIndex: 1,
          explanation: 'La rotación continua en los ejes A y C permite alcanzar caras ocultas con precisión sin desmontar la pieza.'
        }
      },
      de: {
        languageCode: 'de',
        languageName: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        localizedName: 'Hermle C42U 5-Achsen-CNC-Bearbeitungszentrum',
        tagline: 'Submikrometer-Mehrachsenzerspanung für Luft- und Raumfahrt sowie Titan-Chassis.',
        overview: 'Die 5-Achsen-Fräsmaschine verfährt simultan in X-, Y- und Z-Achse und schwenkt gleichzeitig um die A- und C-Drehachsen. Dadurch entfallen aufwändige Umspannvorgänge, und organische Freiformflächen gelingen in höchster Oberflächengüte.',
        safetyProtocols: [
          'Türverriegelung und Polycarbonat-Sicherheitsscheibe vor Spindelanlauf prüfen.',
          'Werkzeuglängenkorrektur und Werkstücknullpunkt (G54-G59) stets mittels Messtaster kalibrieren.',
          'Kühlschmierstoff-Konzentration und Späneförderer auf freien Durchlauf kontrollieren.',
          'Hand am Not-Aus-Schalter (E-Stop) halten bei der ersten Trockenlauf-Simulation.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Spannmittel rüsten', desc: 'Rohling in 5-Achsen-Zentrierspanner einsetzen und mit 80 Nm Drehmoment anziehen.' },
          { step: 2, title: 'Nullpunkt antasten', desc: 'Renishaw-Messtaster einwechseln und Werkstücknullpunkt G54 erfassen.' },
          { step: 3, title: 'Werkzeugmagazin prüfen', desc: 'VHM-Fräser auf Rundlauf und Auskraglänge prüfen, Werkzeugtabelle aktualisieren.' },
          { step: 4, title: 'Grafischer Probelauf', desc: 'Programm im Einzelsatzmodus mit 5% Eilgang oberhalb der Z-Sicherheitsebene starten.' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'Hauptspindel', phonetic: 'ˈhaʊ̯pt.ʃpɪn.dl̩', definition: 'Präzisionsmotorwelle mit Werkzeugaufnahme zur Übertragung des Schnittdrehmoments.' },
          { term: 'Feed Rate', translation: 'Vorschubgeschwindigkeit', phonetic: 'ˈfoːɐ̯.ʃuːp.ɡəˌʃvɪn.dɪç.kaɪ̯t', definition: 'Geschwindigkeit, mit der das Schneidwerkzeug durch das Werkstück geführt wird.' },
          { term: 'G-Code', translation: 'G-Code / DIN 66025', phonetic: 'geː koːt', definition: 'Genormte NC-Programmiersprache zur Steuerung aller Maschinenachsen.' },
          { term: 'Backlash', translation: 'Umkehrspiel', phonetic: 'ˈʊm.keːɐ̯ˌʃpiːl', definition: 'Spiel zwischen Kugelgewindetrieb und Führungsschlitten bei Richtungswechseln.' }
        ],
        quizQuestion: {
          question: 'Was zeichnet die 5-Achs-Simultanbearbeitung gegenüber herkömmlichen 3-Achs-Fräsen aus?',
          options: [
            'Keine Spanabfuhr erforderlich',
            'Komplexe Freiformflächen werden in einer einzigen Aufspannung fehlerfrei gefertigt',
            'Funktioniert nur mit weichem Holz',
            'Benötigt keine Spindeldrehung'
          ],
          correctIndex: 1,
          explanation: 'Durch simultane Schwenk- und Drehbewegungen lassen sich Hinterschnitte und Winkel ohne Neujustage präzise fertigen.'
        }
      },
      zh: {
        languageCode: 'zh',
        languageName: 'Mandarin',
        nativeName: '中文 (简体)',
        flag: '🇨🇳',
        localizedName: '哈默 Hermle C42U 五轴联动数控加工中心',
        tagline: '面向航空航天钛合金底盘与微米级曲面的精密减材制造设备。',
        overview: '五轴数控机床在X、Y、Z三向线性位移的同时，依托A/C回转摆动轴进行联动加工。无需多次重装夹定位，即可高精度切削复杂的异型空间曲面与叶轮叶片。',
        safetyProtocols: [
          '启动主轴前必须确认安全防护门锁死，防爆防弹聚碳酸酯视窗无破损。',
          '通过雷尼绍探针严格校验刀具长度补偿值与工件零点坐标系（G54）。',
          '确认高压切削冷却液浓度正常，排屑螺旋通道畅通无堵塞。',
          '在首件对刀及试切时，右手始终停留在红色紧急制动按钮（E-Stop）上。'
        ],
        quickstartSteps: [
          { step: 1, title: '工件装夹', desc: '将钛合金毛坯放置于五轴自定心精密平口钳中，施加80牛米扭矩紧固。' },
          { step: 2, title: '基准对刀', desc: '调出红外测头对工件几何中心进行点位测定，写入G54工件坐标系。' },
          { step: 3, title: '校准刀库', desc: '核验硬质合金立铣刀跳动精度与悬伸量，同步更新数控系统刀具库参数。' },
          { step: 4, title: '空刀校验', desc: '开启单段执行模式，在Z轴安全平面上方以5%进给倍率空走程序轨迹。' }
        ],
        glossary: [
          { term: 'Spindle', translation: '主轴', phonetic: 'zhǔ zhóu', definition: '高速旋转驱动夹头与刀具切削的高刚性核心电机轴。' },
          { term: 'Feed Rate', translation: '进给速度', phonetic: 'jìn gěi sù dù', definition: '刀具刃口沿加工路径切削材料的线性移动速率（毫米/分钟）。' },
          { term: 'G-Code', translation: 'G代码', phonetic: 'G dài mǎ', definition: '控制机床空间坐标与运动插补的国际标准化数控指令。' },
          { term: 'End Mill', translation: '立铣刀', phonetic: 'lì xǐ dāo', definition: '侧刃与端刃均具备切削能力的圆柱型金属加工刀具。' }
        ],
        quizQuestion: {
          question: '五轴数控加工相比传统三轴铣床最核心的制造优势是什么？',
          options: [
            '切削时完全不会产生铁屑',
            '一次装夹即可加工多面异型复合倾角，杜绝重复定位累积公差',
            '只能用来加工软塑料',
            '无需操作人员编写加工程序'
          ],
          correctIndex: 1,
          explanation: '五轴联动消除了工件多次人工翻面重新对刀带来的形位公差误差，显著提升零件同轴度与表面光洁度。'
        }
      },
      ja: {
        languageCode: 'ja',
        languageName: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        localizedName: 'Hermle C42U 5軸マシニングセンタ',
        tagline: '航空宇宙チタン合金および超精密筐体向けのサブミクロン多軸切削加工機。',
        overview: 'X・Y・Z軸の直交移動に加え、A・C軸の傾斜旋回テーブルが同期して動く5軸同時制御加工機です。段取り替えによるワークの付け直しを排除し、滑らかな自由曲面を高精度に削り出します。',
        safetyProtocols: [
          '主軸回転前にドアインターロックの施錠と防護窓の破損がないことを必ず点検してください。',
          'レニショータッチプローブでワーク原点（G54）と工具長補正値を正確に測定してください。',
          'クーラント（切削油）の希釈濃度およびチップコンベヤの詰まりを確認してください。',
          '初回のドライラン運転中は、非常停止ボタン（E-Stop）の上に手を添えて監視してください。'
        ],
        quickstartSteps: [
          { step: 1, title: 'ワーク固定', desc: '5軸専用セルフセンタリングバイスに材料をセットし、80N·mで締め付けます。' },
          { step: 2, title: '原点出し', desc: '測定プローブを呼び出し、ワーク中央をセンシングしてG54座標系を登録します。' },
          { step: 3, title: '工具マガジン確認', desc: '超硬エンドミルの突き出し長さと振れ精度を測定し、オフセット表を更新します。' },
          { step: 4, title: 'ドライラン検証', desc: 'Z軸クリアランス面上で送り速度5%にて単一ブロック空運転を行い、干渉がないか検証します。' }
        ],
        glossary: [
          { term: 'Spindle', translation: '主軸 (スピンドル)', phonetic: 'shujiku (supindoru)', definition: '切削工具を保持し高速で回転させるマシニングセンタの駆動軸。' },
          { term: 'Feed Rate', translation: '送り速度', phonetic: 'okuri sokudo', definition: '切削工具が工作物に対して相対的に進行する移動速度 (mm/min)。' },
          { term: 'G-Code', translation: 'Gコード', phonetic: 'jī kōdo', definition: '工作機械の動作軌跡や主軸回転数を指示する国際規格NCプログラミング言語。' },
          { term: 'End Mill', translation: 'エンドミル', phonetic: 'endo miru', definition: '外周刃と底刃を備え、溝加工や側面切削を行う代表的な回転切削工具。' }
        ],
        quizQuestion: {
          question: '5軸マシニングセンタが従来の3軸加工機より優れている最大の理由はどれですか？',
          options: [
            '切削油を一切必要としないこと',
            '一度の段取り固定で多面・複合角度を連続加工でき、段取り誤差を極小化できる点',
            '金属は削れず木材専用である点',
            '主軸が回転しなくても切削できる点'
          ],
          correctIndex: 1,
          explanation: '5軸制御によりワークをバイスから外して再クランプする必要がなく、幾何公差の悪化を防ぎます。'
        }
      },
      fr: {
        languageCode: 'fr',
        languageName: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        localizedName: "Centre d'Usinage 5 Axes CNC Hermle C42U",
        tagline: 'Usinage soustractif submicronique pour alliages titane et châssis aérospatiaux.',
        overview: "Ce centre d'usinage 5 axes déplace simultanément les axes linéaires X, Y et Z tout en pivotant sur les axes rotatifs A et C. Cela élimine les montages multiples et permet l'usinage de géométries fluides avec une finition miroir.",
        safetyProtocols: [
          'Vérifiez les sécurités de porte et le blindage polycarbonate avant de lancer la broche.',
          'Validez toujours les jauges d’outils et le zéro pièce (G54) avec le palpeur tactile Renishaw.',
          'Contrôlez le débit du lubrifiant de coupe et le convoyeur à copeaux.',
          'Gardez la main à proximité de l’arrêt d’urgence rouge (E-Stop) lors du cycle d’essai.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Serrage de la pièce', desc: 'Fixez le bloc dans l’étau autocentrant 5 axes avec un couple de 80 Nm.' },
          { step: 2, title: 'Palpage du zéro', desc: 'Déployez la sonde optique pour enregistrer le repère G54 au centre de la pièce.' },
          { step: 3, title: 'Gestion du magasin', desc: 'Inspectez les fraises carbure et confirmez les longueurs dans la table d’outils.' },
          { step: 4, title: 'Essai à blanc', desc: 'Lancez l’exécution avec 5% d’avance au-dessus du plan de sécurité Z.' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'Broche principale', phonetic: 'bʁɔʃ pʁɛ̃.si.pal', definition: 'Axe rotatif motorisé à haute précision entraînant le porte-outil.' },
          { term: 'Feed Rate', translation: 'Vitesse d’avance', phonetic: 'vi.tɛs da.vɑ̃s', definition: 'Vitesse linéaire de déplacement de l’outil dans la matière brute (mm/min).' },
          { term: 'G-Code', translation: 'Code G', phonetic: 'kɔd ʒi', definition: 'Langage normalisé de programmation ISO pour commande numérique.' },
          { term: 'End Mill', translation: 'Fraise monobloc', phonetic: 'fʁɛz mɔ.nɔ.blɔk', definition: 'Outil de coupe rotatif avec arêtes de coupe périphériques et frontales.' }
        ],
        quizQuestion: {
          question: 'Quel est le bénéfice clé de l’usinage 5 axes continu ?',
          options: [
            'Il ne nécessite aucun fluide de refroidissement',
            'Il permet d’usiner des formes complexes en un seul bridage sans repositionnement manuel',
            'Il est restreint aux plastiques très mous',
            'Il ne requiert aucun code de commande'
          ],
          correctIndex: 1,
          explanation: 'La rotation coordonnée des axes A et C autorise l’accès aux faces inclinées sans démonter la pièce de l’étau.'
        }
      },
      hi: {
        languageCode: 'hi',
        languageName: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        localizedName: 'हर्मल C42U 5-एक्सिस सीएनसी मिलिंग मशीन',
        tagline: 'एयरोस्पेस टाइटेनियम और सटीक हार्डवेयर के लिए सब-माइक्रोन बहु-अक्षीय मशीनिंग।',
        overview: 'यह 5-एक्सिस सीएनसी मशीन X, Y और Z अक्षों में रैखिक गति के साथ-साथ A और C अक्षों पर घूमती है। इससे बार-बार वर्कपीस को खोलने और बांधने की आवश्यकता समाप्त हो जाती है और जटिल 3D संरचनाएं उत्कृष्ट फिनिश के साथ बनती हैं।',
        safetyProtocols: [
          'स्पिंडल शुरू करने से पहले सेफ्टी डोर इंटरलॉक और पॉलीकार्बोनेट ग्लास की जांच करें।',
          'रेनिशॉ टच प्रोब से टूल लेंथ ऑफसेट और वर्कपीस ज़ीरो (G54) को अवश्य सत्यापित करें।',
          'कूलेंट स्तर और चिप कन्वेयर (धातु के छिलके निकालने वाली प्रणाली) की जांच करें।',
          'पहली बार ड्राई रन के दौरान लाल इमरजेंसी स्टॉप (E-Stop) बटन के पास हाथ तैयार रखें।'
        ],
        quickstartSteps: [
          { step: 1, title: 'वर्कपीस फिक्सिंग', desc: '5-एक्सिस सेल्फ-सेंटरिंग वाइस में धातु ब्लॉक को 80 Nm टॉर्क पर कसें।' },
          { step: 2, title: 'जीरो ओरिजिन सेट करें', desc: 'ऑप्टिकल टच प्रोब चलाकर G54 रेफरेंस पॉइंट सेट करें।' },
          { step: 3, title: 'टूल कैरोसेल लोड करें', desc: 'कार्बाइड एंड मिल टूल की जांच करें और मशीन ऑफसेट टेबल में मान दर्ज करें।' },
          { step: 4, title: 'ड्राई रन टेस्ट', desc: 'वर्कपीस को छुए बिना 5% स्पीड पर हवा में जी-कोड पाथ चलाकर जांचें।' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'स्पिंडल (मुख्य धुरी)', phonetic: 'spɪn.dəl', definition: 'उच्च गति वाली मोटर शाफ्ट जो कटिंग टूल को मजबूती से पकड़ती है।' },
          { term: 'Feed Rate', translation: 'फ़ीड दर (गति)', phonetic: 'fiːd reːt', definition: 'वह गति जिससे कटिंग टूल धातु में आगे बढ़ता है (मिमी/मिनट)।' },
          { term: 'G-Code', translation: 'जी-कोड', phonetic: 'dʒiː koːɖ', definition: 'सीएनसी मशीनों को चलाने वाली मानकीकृत न्यूमेरिकल भाषा।' },
          { term: 'End Mill', translation: 'एंड मिल (कटिंग बिट)', phonetic: 'ɛnd mɪl', definition: 'सटीक कटिंग के लिए प्रयुक्त बेलनाकार धातु कटाई औजार।' }
        ],
        quizQuestion: {
          question: '5-एक्सिस मशीनिंग का पारंपरिक 3-एक्सिस मिलिंग पर सबसे बड़ा लाभ क्या है?',
          options: [
            'इसमें बिल्कुल भी कूलेंट की आवश्यकता नहीं होती',
            'बिना दोबारा कसे एक ही सेटअप में जटिल कोणों और घुमावों की सटीक कटिंग होती है',
            'यह केवल लकड़ी को काट सकती है',
            'इसमें किसी कंप्यूटर की जरूरत नहीं होती'
          ],
          correctIndex: 1,
          explanation: 'A और C अक्षों पर घूमने के कारण एक ही बार में पूरे वर्कपीस के सभी कोणों को बिना हिलाए काटा जा सकता है।'
        }
      },
      pt: {
        languageCode: 'pt',
        languageName: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        localizedName: 'Centro de Usinagem CNC 5 Eixos Hermle C42U',
        tagline: 'Usinagem submicrométrica multieixo para aeroespacial e ligas de titânio.',
        overview: 'A fresadora CNC de 5 eixos movimenta-se simultaneamente nos eixos X, Y e Z enquanto rotaciona nos eixos A e C, eliminando reposicionamentos manuais de fixação.',
        safetyProtocols: [
          'Verifique as travas da porta de segurança e o visor antes de girar o fuso.',
          'Valide o comprimento das ferramentas e a origem da peça (G54) com o apalpador Renishaw.',
          'Assegure o fluxo de fluido de refrigeração e desobstrução do transportador de cavacos.',
          'Mantenha a mão no botão de Parada de Emergência (E-Stop) no primeiro teste em vazio.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Fixação da Peça', desc: 'Fixe o bloco na morsa autocentrante com torque de 80 Nm.' },
          { step: 2, title: 'Apalpação de Zero', desc: 'Utilize o sensor óptico para registrar o zero-peça G54.' },
          { step: 3, title: 'Carregamento de Ferramentas', desc: 'Confira as fresas de metal duro e atualize a tabela de compensações.' },
          { step: 4, title: 'Simulação a Seco', desc: 'Execute o programa com 5% de avanço no plano de segurança Z.' }
        ],
        glossary: [
          { term: 'Spindle', translation: 'Eixo-Árvore (Fuso)', phonetic: 'ˈe.ʃu ˈaʁ.vu.ɾi', definition: 'Eixo de rotação de alta precisão que aciona a ferramenta de corte.' },
          { term: 'Feed Rate', translation: 'Taxa de Avanço', phonetic: 'ˈta.sɐ dʒi aˈvɐ̃.su', definition: 'Velocidade linear na qual a ferramenta penetra no material.' },
          { term: 'G-Code', translation: 'Código G', phonetic: 'ˈkɔ.dʒi.ɡu ʒe', definition: 'Linguagem padronizada de controle numérico computorizado.' },
          { term: 'End Mill', translation: 'Fresa Cilíndrica', phonetic: 'ˈfɾɛ.zɐ siˈlĩ.dɾi.kɐ', definition: 'Ferramenta rotativa de corte de topo e lateral.' }
        ],
        quizQuestion: {
          question: 'Qual é a principal vantagem da usinagem em 5 eixos contínuos?',
          options: [
            'Não utiliza lubrificação',
            'Usinagem de peças complexas em fixação única sem erros de reposicionamento',
            'Apenas corta plásticos macios',
            'Dispensa programação por computador'
          ],
          correctIndex: 1,
          explanation: 'Ao girar os eixos A e C de modo coordenado, a ferramenta alcança todos os planos angulares sem remover a peça.'
        }
      }
    }
  },
  {
    id: 'ros2-robotics',
    name: 'ROS 2 & Dynamic Arm Kinematics Framework',
    category: 'Robotics & Automation',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    associatedWorkerIds: ['w-2', 'w-6'],
    workplaceIds: ['wp-2', 'wp-6'],
    translations: {
      en: {
        languageCode: 'en',
        languageName: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        localizedName: 'ROS 2 Robotics & Kinematics Framework',
        tagline: 'Deterministic middleware for multi-joint robotic arms and spatial navigation.',
        overview: 'Robot Operating System 2 (Humble/Iron) provides an industrial DDS communication layer for publishing sensor telemetry, subscribing to motor joint commands, and solving forward/inverse kinematics using MoveIt 2 and Nav2.',
        safetyProtocols: [
          'Always configure joint torque limits and software velocity clamps before deploying to physical servo drives.',
          'Verify external hardware E-stop loop and keep personnel outside the robotic cell envelope.',
          'Use simulated rviz2 / gazebo trajectory checks before transmitting live trajectory goals.',
          'Confirm optical safety light curtains are wired and tested.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Workspace Setup', desc: 'Source /opt/ros/humble/setup.bash and colcon build your manipulator package.' },
          { step: 2, title: 'URDF Inspection', desc: 'Launch check_urdf to validate robot joint coordinate frames and inertia matrices.' },
          { step: 3, title: 'Launch MoveIt', desc: 'Start move_group node and verify OMPL planner trajectory smoothing in RViz.' },
          { step: 4, title: 'Hardware Loop', desc: 'Engage ros2_control hardware interface and command target end-effector poses.' }
        ],
        glossary: [
          { term: 'Node', translation: 'Node', phonetic: 'noʊd', definition: 'An individual executable process in ROS that performs computation and communicates over topics.' },
          { term: 'Topic', translation: 'Topic', phonetic: 'ˈtɑː.pɪk', definition: 'A unidirectional named bus over which nodes exchange strongly-typed messages.' },
          { term: 'Inverse Kinematics', translation: 'Inverse Kinematics (IK)', phonetic: 'ɪnˈvɝːs ˌkɪn.əˈmæt̬.ɪks', definition: 'Mathematical calculation of joint angles needed to achieve a desired end-effector position in 3D space.' },
          { term: 'URDF', translation: 'Unified Robot Description Format', phonetic: 'juː ɑːr diː ɛf', definition: 'XML specification defining robot link geometry, visual meshes, and joint limits.' }
        ],
        quizQuestion: {
          question: 'What is the role of Inverse Kinematics (IK) in robotics?',
          options: [
            'To measure battery voltage',
            'To calculate the necessary joint angles to place the robot hand at a target 3D coordinate',
            'To convert C++ code into Python',
            'To turn off the power supply'
          ],
          correctIndex: 1,
          explanation: 'IK calculates the necessary joint rotations (theta1..theta6) so that the gripper reaches an exact cartesian X, Y, Z, roll, pitch, yaw target.'
        }
      },
      es: {
        languageCode: 'es',
        languageName: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        localizedName: 'Entorno de Robótica y Cinemática ROS 2',
        tagline: 'Middleware determinista para brazos robóticos multiarticulados y navegación espacial.',
        overview: 'Robot Operating System 2 proporciona una capa de comunicación DDS industrial para publicar telemetría de sensores, suscribirse a comandos articulares y resolver cinemática directa e inversa mediante MoveIt 2.',
        safetyProtocols: [
          'Configure siempre límites de par motor y velocidades de seguridad por software antes del despliegue en servomotores físicos.',
          'Compruebe el lazo de parada de emergencia exterior y mantenga al personal fuera del radio de acción del robot.',
          'Valide las trayectorias en RViz o Gazebo antes de enviar los puntos de paso al robot real.',
          'Asegure el funcionamiento de las barreras ópticas fotoeléctricas perimetrales.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Entorno de Trabajo', desc: 'Ejecute source /opt/ros/humble/setup.bash y compile su paquete con colcon build.' },
          { step: 2, title: 'Verificación URDF', desc: 'Valide con check_urdf los sistemas de coordenadas de las articulaciones y matrices de inercia.' },
          { step: 3, title: 'Lanzamiento MoveIt', desc: 'Inicie el nodo move_group y ajuste los planificadores OMPL en RViz.' },
          { step: 4, title: 'Enlace Hardware', desc: 'Active ros2_control y ordene posiciones objetivo para la pinza terminal.' }
        ],
        glossary: [
          { term: 'Node', translation: 'Nodo (Node)', phonetic: 'ˈno.ðo', definition: 'Proceso ejecutable autónomo en ROS que realiza cálculos y se comunica mediante mensajes.' },
          { term: 'Topic', translation: 'Tópico / Canal', phonetic: 'ˈto.pi.ko', definition: 'Bus de comunicación unidireccional con nombre por el que fluyen mensajes tipados.' },
          { term: 'Inverse Kinematics', translation: 'Cinemática Inversa', phonetic: 'si.neˈma.ti.ka imˈbeɾ.sa', definition: 'Cálculo analítico de los ángulos articulares necesarios para ubicar la pinza en una coordenada 3D.' },
          { term: 'URDF', translation: 'Formato Unificado de Descripción Robótica', phonetic: 'u.ɛɾ.deˈɛ.fe', definition: 'Archivo XML que define enlaces, masas, límites y cinemática de un robot.' }
        ],
        quizQuestion: {
          question: '¿Qué función cumple la Cinemática Inversa (IK) en un brazo robótico?',
          options: [
            'Calcular la temperatura de la batería',
            'Calcular los ángulos de cada articulación para colocar el efector final en un punto 3D deseado',
            'Cambiar el color del robot',
            'Apagar el sistema operativo'
          ],
          correctIndex: 1,
          explanation: 'La cinemática inversa calcula qué ángulo debe adoptar cada motor para que la pinza alcance las coordenadas espaciales deseadas.'
        }
      },
      de: {
        languageCode: 'de',
        languageName: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        localizedName: 'ROS 2 Robotik- und Kinematik-Framework',
        tagline: 'Echtzeit-Middleware für Mehrgelenk-Roboterarme und räumliche Pfadplanung.',
        overview: 'ROS 2 bietet eine robuste DDS-Nachrichtenarchitektur für industrielle Automatisierung, publiziert Sensordaten, steuert Antriebsgelenke und löst inverse Kinematik mit MoveIt 2.',
        safetyProtocols: [
          'Drehmoment- und Geschwindigkeitsgrenzen immer vorab im Controller drosseln.',
          'Externen Not-Aus-Sicherheitskreis prüfen und Arbeitsbereich absperren.',
          'Trajektorien vor dem Senden an reale Antriebe immer zuerst in RViz simulieren.',
          'Lichtschranken und Schutzzaunkontakte auf einwandfreie Abschaltung testen.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Workspace bauen', desc: 'ROS-Umgebung sourcen und Manipulator-Paket mit colcon build kompilieren.' },
          { step: 2, title: 'URDF prüfen', desc: 'Gelenkhierarchie und Trägheitsdaten mit check_urdf validieren.' },
          { step: 3, title: 'MoveIt starten', desc: 'Move-Group-Node starten und kollisionsfreie Trajektorien in RViz planen.' },
          { step: 4, title: 'Hardware ansteuern', desc: 'ros2_control-Treiber aktivieren und Zielposen an den Greifer senden.' }
        ],
        glossary: [
          { term: 'Node', translation: 'Knoten (Node)', phonetic: 'ˈknoː.tn̩', definition: 'Eigenständiger Prozess in ROS, der Berechnungen ausführt und über Topics kommuniziert.' },
          { term: 'Topic', translation: 'Thema (Topic)', phonetic: 'ˈtɔ.pɪk', definition: 'Benannter Datenbus für asynchronen nachrichtenbasierten Datenaustausch.' },
          { term: 'Inverse Kinematics', translation: 'Inverse Kinematik', phonetic: 'ɪnˈvɛʁ.zə ki.neˈmaː.tɪk', definition: 'Berechnung der notwendigen Gelenkwinkel für eine geforderte Greiferposition im Raum.' },
          { term: 'URDF', translation: 'Roboterbeschreibungsformat (URDF)', phonetic: 'uː ʔɛʁ deː ʔɛf', definition: 'XML-Format zur Spezifikation von Robotergliedern, Gelenken und Trägheitsmomenten.' }
        ],
        quizQuestion: {
          question: 'Welche Aufgabe übernimmt die inverse Kinematik bei einem 6-Achs-Roboter?',
          options: [
            'Sie misst die Umgebungstemperatur',
            'Sie berechnet die exakten Gelenkwinkel, um den Greifer an eine bestimmte Zielkoordinate im 3D-Raum zu führen',
            'Sie wechselt die Schmierstoffe',
            'Sie deaktiviert den Not-Aus'
          ],
          correctIndex: 1,
          explanation: 'Inverse Kinematik transformiert kartesische Zielpositionen (X, Y, Z, Roll, Pitch, Yaw) in die benötigten Winkelstellungen aller Gelenke.'
        }
      },
      zh: {
        languageCode: 'zh',
        languageName: 'Mandarin',
        nativeName: '中文 (简体)',
        flag: '🇨🇳',
        localizedName: 'ROS 2 机器人系统与机械臂运动学框架',
        tagline: '面向工业多关节协作机械臂与自主导航的实时分布式中间件。',
        overview: 'ROS 2 基于工业级DDS发布/订阅通信架构，能够高确定性地收发激光雷达与关节编码器数据，并结合 MoveIt 2 高速求解六自由度逆运动学与空间防碰撞避障。',
        safetyProtocols: [
          '在向真实伺服驱动器下发指令前，务必在参数服务器中配置关节力矩阈值与软件限速。',
          '检验硬件硬线急停回路（E-Stop），严禁任何人员在机械臂活动工作包络范围内逗留。',
          '在向实体机器人下发动作前，必须在 RViz2 / Gazebo 仿真环境中校验平滑轨迹。',
          '确认安全光栅与区域激光扫描仪处于激活保护状态。'
        ],
        quickstartSteps: [
          { step: 1, title: '环境编译', desc: 'source /opt/ros/humble/setup.bash 并使用 colcon build 编译机械臂工作空间。' },
          { step: 2, title: 'URDF验证', desc: '使用 check_urdf 检查连杆坐标系树形结构与转动惯量矩阵是否合理。' },
          { step: 3, title: '规划启动', desc: '启动 move_group 节点，在 RViz 中通过 OMPL 规划算法求解无碰撞平滑路径。' },
          { step: 4, title: '硬件伺服', desc: '挂载 ros2_control 硬件抽象接口，向末端执行器发送目标空间位姿。' }
        ],
        glossary: [
          { term: 'Node', translation: '节点 (Node)', phonetic: 'jié diǎn', definition: 'ROS中独立执行计算任务并通过主题收发数据的最小进程单元。' },
          { term: 'Topic', translation: '话题 / 主题 (Topic)', phonetic: 'huà tí', definition: '节点之间进行异步单向传输强类型消息的具名通信通道。' },
          { term: 'Inverse Kinematics', translation: '逆运动学 (IK)', phonetic: 'nì yùn dòng xué', definition: '根据末端执行器在三维空间中的期望位姿，反向求解各关节旋转角度的数学算法。' },
          { term: 'URDF', translation: '统一机器人描述格式', phonetic: 'tǒng yī jī qì rén miáo shù', definition: '定义机器人几何构型、网格模型、关节极限与碰撞体的XML技术规范。' }
        ],
        quizQuestion: {
          question: '在机器人运动控制中，逆运动学（IK）的核心作用是什么？',
          options: [
            '测量主板供电电压',
            '根据机械爪的目标空间坐标，反算出各个关节电机需要转动的角度',
            '更改机器人的外观颜色',
            '关闭机器人的所有传感器'
          ],
          correctIndex: 1,
          explanation: '逆运动学将笛卡尔空间的目标三维坐标变换为关节空间的驱动角度，使末端准确到达作业点。'
        }
      },
      ja: {
        languageCode: 'ja',
        languageName: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        localizedName: 'ROS 2 ロボティクス＆アーム運動学フレームワーク',
        tagline: '多関節ロボットアーム制御と自律走行のための確定的なミドルウェア。',
        overview: 'ROS 2はDDS通信レイヤーにより、センサテレメトリの送受信やモータ指令のパブリッシュ/サブスクライブを安定実行し、MoveIt 2によって逆運動学（IK）と干渉チェックを高速に処理します。',
        safetyProtocols: [
          '実サーボに指令を送る前に、必ず各関節のトルクリミットおよびソフトウェア制限速度を設定してください。',
          '非常停止ボタン（E-Stop）の導通を確認し、ロボットの動作可動範囲内への立ち入りを厳禁してください。',
          '実機へ送信する前に、RViz2またはGazeboのシミュレータ上で軌道が滑らかであることを確認してください。',
          'セーフティライトカーテン（安全光線）の遮光停止テストを実施してください。'
        ],
        quickstartSteps: [
          { step: 1, title: 'ビルド設定', desc: 'ROS環境をsourceし、colcon buildでマニピュレータパッケージをビルドします。' },
          { step: 2, title: 'URDF検証', desc: 'check_urdfコマンドでリンク座標系ツリーと慣性モーメントの整合性を検査します。' },
          { step: 3, title: 'MoveIt起動', desc: 'move_groupノードを起動し、RViz上で障害物を避ける軌道を計画します。' },
          { step: 4, title: '実機制御', desc: 'ros2_controlインターフェースを有効化し、エンドエフェクタへ目標姿勢を送信します。' }
        ],
        glossary: [
          { term: 'Node', translation: 'ノード (Node)', phonetic: 'nōdo', definition: '計算を実行しトピックを介して通信を行うROSの実行可能プロセス。' },
          { term: 'Topic', translation: 'トピック (Topic)', phonetic: 'topikku', definition: 'ノード間で型付きメッセージを非同期に交換するための名前付き通信バス。' },
          { term: 'Inverse Kinematics', translation: '逆運動学 (IK)', phonetic: 'gyaku undōgaku', definition: 'ハンド先端の3次元目標位置・姿勢から、必要な各関節の角度を逆算する計算手法。' },
          { term: 'URDF', translation: '統一ロボット記述フォーマット', phonetic: 'tōitsu robotto kijutsu', definition: 'ロボットの幾何学的形状、ジョイント制限、慣性情報を定義するXMLファイル。' }
        ],
        quizQuestion: {
          question: 'ロボット工学における「逆運動学 (IK)」の役割は何ですか？',
          options: [
            'アームの重量を計量すること',
            'ハンドを目標の3次元座標に配置するために必要な各関節の回転角度を計算すること',
            'ロボットの電源を切断すること',
            'プログラミング言語を英語から日本語に翻訳すること'
          ],
          correctIndex: 1,
          explanation: '逆運動学により、作業空間上のX,Y,Z座標から各モータの回転角度を特定できます。'
        }
      },
      fr: {
        languageCode: 'fr',
        languageName: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        localizedName: 'Cadre Robotique & Cinématique ROS 2',
        tagline: 'Middleware déterministe pour bras manipulateurs et navigation autonome.',
        overview: 'ROS 2 fournit une couche de communication industrielle DDS pour échanger la télémétrie capteurs, commander les servomoteurs et résoudre la cinématique inverse avec MoveIt 2.',
        safetyProtocols: [
          'Configurez les limites de couple et de vitesse dans les contrôleurs avant tout raccordement aux moteurs réels.',
          'Vérifiez la chaîne d’arrêt d’urgence et interdisez l’accès dans le périmètre de travail du bras.',
          'Simulez la trajectoire dans RViz2 avant l’envoi des consignes à la machine physique.',
          'Testez le bon déclenchement des barrières immatérielles de sécurité.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Compilation', desc: 'Sourcez /opt/ros/humble/setup.bash et compilez votre espace avec colcon build.' },
          { step: 2, title: 'Validation URDF', desc: 'Vérifiez la structure articulaire avec check_urdf.' },
          { step: 3, title: 'Lancement MoveIt', desc: 'Démarrez move_group et validez les trajectoires anti-collision dans RViz.' },
          { step: 4, title: 'Commande servo', desc: 'Activez ros2_control pour piloter la pince en coordonnées cartésiennes.' }
        ],
        glossary: [
          { term: 'Node', translation: 'Nœud (Node)', phonetic: 'nø', definition: 'Processus individuel exécutable réalisant des calculs et communiquant par topics.' },
          { term: 'Topic', translation: 'Sujet / Topic', phonetic: 'tɔ.pik', definition: 'Canal nommé permettant l’échange asynchrone de messages typés.' },
          { term: 'Inverse Kinematics', translation: 'Cinématique Inverse', phonetic: 'si.ne.ma.tik ɛ̃.vɛʁs', definition: 'Calcul des angles articulaires pour positionner l’organe terminal à un point 3D défini.' },
          { term: 'URDF', translation: 'Format de Description Robotique', phonetic: 'y.ɛʁ.de.ɛf', definition: 'Spécification XML décrivant les liens cinématiques et les inerties du robot.' }
        ],
        quizQuestion: {
          question: 'Quel est le rôle de la cinématique inverse dans un bras manipulateur ?',
          options: [
            'Surveiller l’autonomie électrique',
            'Déterminer les angles de chaque articulation pour amener la pince à la coordonnée 3D souhaitée',
            'Repeindre le carter du robot',
            'Éteindre l’ordinateur de bord'
          ],
          correctIndex: 1,
          explanation: 'La cinématique inverse résout les équations mathématiques reliant la position spatiale cible aux rotations angulaires des moteurs.'
        }
      },
      hi: {
        languageCode: 'hi',
        languageName: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        localizedName: 'आरओएस 2 (ROS 2) रोबोटिक्स और काइनेमैटिक्स फ्रेमवर्क',
        tagline: 'मल्टी-जॉइंट रोबोटिक आर्म्स और नेविगेशन के लिए इंडस्ट्रियल मिडलवेयर।',
        overview: 'रोबोट ऑपरेटिंग सिस्टम 2 (ROS 2) रोबोट के सेंसर और मोटरों के बीच तेज़ और सुरक्षित संचार प्रदान करता है, और MoveIt 2 की सहायता से आर्म की उल्टी गतिशीलता (Inverse Kinematics) की गणना करता है।',
        safetyProtocols: [
          'भौतिक सर्वो मोटर पर कोड चलाने से पहले सॉफ़्टवेयर में टार्क और गति सीमा सेट करें।',
          'इमरजेंसी स्टॉप बटन की जांच करें और किसी भी व्यक्ति को रोबोट की कार्य सीमा के अंदर न जाने दें।',
          'असली रोबोट को निर्देश भेजने से पहले RViz सिमुलेटर में पाथ की जांच करें।',
          'सेफ्टी लाइट कर्टन (सेंसर ग्रिड) की कार्यप्रणाली सुनिश्चित करें।'
        ],
        quickstartSteps: [
          { step: 1, title: 'वर्कस्पेस बिल्ड', desc: 'ROS 2 सेटअप फ़ाइल सोर्स करें और पैकेज को colcon build से कंपाइल करें।' },
          { step: 2, title: 'URDF जांचें', desc: 'check_urdf से रोबोट के सभी जोड़ों और फ्रेम्स की जांच करें।' },
          { step: 3, title: 'MoveIt शुरू करें', desc: 'move_group नोड चलाएं और RViz में सुरक्षित रोबोटिक पथ तैयार करें।' },
          { step: 4, title: 'हार्डवेयर कंट्रोल', desc: 'ros2_control इंटरफ़ेस शुरू करें और रोबोट ग्रिपर को लक्ष्य पर भेजें।' }
        ],
        glossary: [
          { term: 'Node', translation: 'नोड (Node)', phonetic: 'noːɖ', definition: 'ROS में गणना करने और डेटा भेजने वाला एक स्वतंत्र प्रोसेस।' },
          { term: 'Topic', translation: 'टॉपिक (Topic)', phonetic: 'ʈɔː.pɪk', definition: 'एक नामकृत चैनल जिसके माध्यम से नोड्स संदेशों का आदान-प्रदान करते हैं।' },
          { term: 'Inverse Kinematics', translation: 'इनवर्स काइनेमैटिक्स (उलटी गतिशीलता)', phonetic: 'ɪnˈvəːs ˌkɪnɪˈmatɪks', definition: 'रोबोट हाथ को किसी 3D बिंदु पर ले जाने के लिए आवश्यक जोड़ों के कोणों की गणना।' },
          { term: 'URDF', translation: 'रोबोट विवरण प्रारूप', phonetic: 'juː ɑːr diː ɛf', definition: 'रोबोट संरचना और जोड़ों की सीमाओं को परिभाषित करने वाली एक्सएमएल फाइल।' }
        ],
        quizQuestion: {
          question: 'रोबोटिक्स में इनवर्स काइनेमैटिक्स (IK) का क्या काम है?',
          options: [
            'बैटरी की जांच करना',
            'रोबोट ग्रिपर को लक्ष्य 3D पॉइंट पर ले जाने के लिए आवश्यक जॉइंट कोणों की गणना करना',
            'रोबोट का रंग बदलना',
            'कंप्यूटर को रीस्टार्ट करना'
          ],
          correctIndex: 1,
          explanation: 'इनवर्स काइनेमैटिक्स यह गणितीय गणना करता है कि रोबोट के सभी जोड़ों को कितना घुमाया जाए ताकि हाथ सटीक जगह पहुंच सके।'
        }
      },
      pt: {
        languageCode: 'pt',
        languageName: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        localizedName: 'Framework de Robótica e Cinemática ROS 2',
        tagline: 'Middleware em tempo real para braços robóticos industriais e navegação autônoma.',
        overview: 'O ROS 2 oferece uma arquitetura de comunicação DDS determinística para ler sensores e comandar juntas de robôs com MoveIt 2.',
        safetyProtocols: [
          'Configure limites de torque e velocidade antes de acionar servomotores reais.',
          'Verifique o botão de emergência E-Stop e mantenha a área de trabalho isolada.',
          'Simule as trajetórias no RViz antes de comandar a máquina real.',
          'Certifique-se de que as cortinas de luz de segurança estejam ativas.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Compilação', desc: 'Carregue o ambiente ROS e use colcon build no seu pacote.' },
          { step: 2, title: 'Validação URDF', desc: 'Execute check_urdf para inspecionar eixos e inércias.' },
          { step: 3, title: 'MoveIt', desc: 'Inicie o nó move_group e planeje trajetórias sem colisões no RViz.' },
          { step: 4, title: 'Execução', desc: 'Ative ros2_control para posicionar o efetuador final.' }
        ],
        glossary: [
          { term: 'Node', translation: 'Nó (Node)', phonetic: 'nɔ', definition: 'Processo executável que realiza cálculos e publica dados em tópicos.' },
          { term: 'Topic', translation: 'Tópico', phonetic: 'ˈtɔ.pi.ku', definition: 'Canal de comunicação nomeado para troca assíncrona de mensagens.' },
          { term: 'Inverse Kinematics', translation: 'Cinemática Inversa', phonetic: 'si.neˈma.tʃi.kɐ ĩˈvɛʁ.sɐ', definition: 'Cálculo analítico dos ângulos necessários para levar o efetuador a uma coordenada 3D.' },
          { term: 'URDF', translation: 'Formato Unificado de Descrição Robótica', phonetic: 'u.ɛ.ʁe.de.ɛ.fi', definition: 'Arquivo XML que descreve a geometria e restrições do robô.' }
        ],
        quizQuestion: {
          question: 'Qual é o papel da Cinemática Inversa (IK)?',
          options: [
            'Verificar a temperatura da sala',
            'Calcular os ângulos articulares para posicionar o efetuador em uma coordenada 3D',
            'Formatar o disco rígido',
            'Trocar a carcaça do robô'
          ],
          correctIndex: 1,
          explanation: 'A cinemática inversa calcula as rotações necessárias em cada junta para alcançar a posição espacial desejada.'
        }
      }
    }
  },
  {
    id: 'altium-pcb',
    name: 'Altium Designer & High-Speed Circuitry',
    category: 'Embedded Systems',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    associatedWorkerIds: ['w-3', 'w-4'],
    workplaceIds: ['wp-3', 'wp-4'],
    translations: {
      en: {
        languageCode: 'en',
        languageName: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        localizedName: 'Altium Designer PCB & High-Speed Routing',
        tagline: 'Multi-layer printed circuit board layout with controlled impedance and EMI shielding.',
        overview: 'Industry-standard EDA software for capturing schematics, designing high-density interconnect (HDI) PCB stackups, matching differential pair trace lengths, and exporting IPC-2581 manufacturing packages.',
        safetyProtocols: [
          'Follow ESD (Electrostatic Discharge) grounding strap procedures when inspecting bare copper prototypes.',
          'Verify creepage and clearance design rules (DRC) when routing high-voltage or AC mains circuits.',
          'Inspect solder mask expansion and thermal relief connections to ground planes to prevent cold joints.',
          'Always generate 3D STEP clearance check against metal casing enclosures before fabrication.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Schematic Capture', desc: 'Connect components, configure power distribution networks, and compile for ERC errors.' },
          { step: 2, title: 'Layer Stack Manager', desc: 'Define 4-to-8 layer stackup with dielectric prepregs and 50-ohm single-ended impedance.' },
          { step: 3, title: 'Differential Routing', desc: 'Route high-speed USB/Ethernet traces with matched serpentine tuning.' },
          { step: 4, title: 'Gerber Export', desc: 'Generate ODB++ / Gerber X2 files and NC drill tables for fabrication.' }
        ],
        glossary: [
          { term: 'Via', translation: 'Via', phonetic: 'ˈvaɪ.ə', definition: 'Plated through-hole connecting copper traces across different layers of a PCB.' },
          { term: 'Trace', translation: 'Trace', phonetic: 'treɪs', definition: 'A conductive copper path on a circuit board carrying electrical signals or current.' },
          { term: 'Impedance', translation: 'Characteristic Impedance', phonetic: 'ɪmˈpiː.dəns', definition: 'The ratio of voltage to current in a high-frequency transmission line (typically 50 or 90 ohms).' },
          { term: 'Silkscreen', translation: 'Silkscreen', phonetic: 'ˈsɪlk.skriːn', definition: 'Ink layer printed on the PCB showing component designators and polarity marks.' }
        ],
        quizQuestion: {
          question: 'Why is trace length matching critical for high-speed differential pairs (such as USB or HDMI)?',
          options: [
            'To make the board look more symmetrical',
            'To prevent signal skew and phase distortion so complementary signals arrive simultaneously',
            'To reduce the total weight of the circuit board',
            'To allow higher voltages'
          ],
          correctIndex: 1,
          explanation: 'Differential signaling requires both positive and negative signals to reach the receiver at the exact same picosecond to cancel out noise and avoid timing skew.'
        }
      },
      es: {
        languageCode: 'es',
        languageName: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        localizedName: 'Altium Designer y Ruteo PCB de Alta Velocidad',
        tagline: 'Diseño de circuitos impresos multicapa con impedancia controlada y apantallamiento EMI.',
        overview: 'Software estándar para captura esquemática, diseño de placas de interconexión de alta densidad (HDI), adaptación de pares diferenciales y generación de archivos Gerber para fabricación.',
        safetyProtocols: [
          'Utilice pulsera antiestática (ESD) al manipular prototipos de cobre.',
          'Verifique las reglas de separación de pistas (DRC) en sectores de alto voltaje.',
          'Compruebe los alivios térmicos en los planos de masa para evitar soldaduras frías.',
          'Realice una prueba de colisión 3D STEP contra el chasis mecánico antes de enviar a fabricar.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Captura Esquemática', desc: 'Conecte componentes, asigne redes de alimentación y verifique errores ERC.' },
          { step: 2, title: 'Apilamiento de Capas', desc: 'Configure el apilado de 4 a 8 capas con impedancia controlada de 50 ohmios.' },
          { step: 3, title: 'Ruteo Diferencial', desc: 'Trace líneas USB de alta velocidad con compensación de longitud por serpentina.' },
          { step: 4, title: 'Exportación Gerber', desc: 'Genere archivos ODB++ y tablas de taladrado NC para el fabricante.' }
        ],
        glossary: [
          { term: 'Via', translation: 'Vía de Interconexión', phonetic: 'ˈbi.a', definition: 'Orificio metalizado que conecta pistas de cobre entre distintas capas de una placa PCB.' },
          { term: 'Trace', translation: 'Pista de Cobre', phonetic: 'ˈpis.ta ðe ˈko.βɾe', definition: 'Camino conductor de cobre que transporta señales eléctricas o corriente.' },
          { term: 'Impedance', translation: 'Impedancia Característica', phonetic: 'im.peˈðan.sja', definition: 'Oposición al flujo de corriente alterna a altas frecuencias (habitualmente 50 o 90 ohmios).' },
          { term: 'Silkscreen', translation: 'Serigrafía', phonetic: 'se.ɾi.ɣɾaˈfi.a', definition: 'Capa de tinta que indica la numeración y polaridad de los componentes.' }
        ],
        quizQuestion: {
          question: '¿Por qué es fundamental igualar la longitud de las pistas en pares diferenciales de alta velocidad?',
          options: [
            'Para que la placa quede más bonita estéticamente',
            'Para evitar desfasajes temporales y que ambas señales complementarias lleguen al mismo tiempo',
            'Para que pese menos el circuito',
            'Para aumentar el voltaje de la batería'
          ],
          correctIndex: 1,
          explanation: 'La señalización diferencial cancela el ruido electromagnético solo si ambas señales llegan simultáneamente al receptor.'
        }
      },
      de: {
        languageCode: 'de',
        languageName: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        localizedName: 'Altium Designer Leiterplattenentwurf (PCB)',
        tagline: 'Mehrlagiges PCB-Layout mit kontrollierter Impedanz und EMV-Schirmung.',
        overview: 'Professionelle EDA-Umgebung zur Schaltplanerfassung, HDI-Lagenaufbau-Definition, Längenanpassung differentieller Leitungspaare und Fertigungsdatengenerierung.',
        safetyProtocols: [
          'ESD-Schutzarmband beim Prüfen unbestückter Leiterplatten anlegen.',
          'Kriech- und Luftstrecken (DRC) bei Hochspannungskreisen penibel kontrollieren.',
          'Wärmeentlastungs-Anbindungen (Thermal Reliefs) an Masseflächen prüfen.',
          '3D-STEP-Kollisionsprüfung gegen das Gehäuse vor der Fertigungsfreigabe durchführen.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Schaltplan erstellen', desc: 'Komponenten verdrahten und Electrical Rule Check (ERC) ausführen.' },
          { step: 2, title: 'Lagenaufbau definieren', desc: '4- bis 8-lagigen Stackup mit dielektrischen Prepregs und 50-Ohm-Leitungen anlegen.' },
          { step: 3, title: 'Differentielle Leitungen', desc: 'High-Speed-Leitungen mit Mäanderstrukturen längengleich verlegen.' },
          { step: 4, title: 'Gerber-Ausgabe', desc: 'Fertigungsunterlagen (Gerber X2, ODB++, Bohrdateien) exportieren.' }
        ],
        glossary: [
          { term: 'Via', translation: 'Durchkontaktierung (Via)', phonetic: 'ˈviː.a', definition: 'Metallisiertes Bohrloch zur elektrischen Verbindung verschiedener Leiterebenen.' },
          { term: 'Trace', translation: 'Leiterbahn', phonetic: 'ˈlaɪ̯.tɐˌbaːn', definition: 'Kupferbahn auf der Platine zur Leitung von Strom und elektrischen Signalen.' },
          { term: 'Impedance', translation: 'Wellenwiderstand', phonetic: 'ˈvɛ.ln̩ˌviː.dɐ.ʃtant', definition: 'Elektrischer Widerstand einer Hochfrequenzleitung (typisch 50 oder 90 Ohm).' },
          { term: 'Silkscreen', translation: 'Bestückungsdruck', phonetic: 'bəˈʃtʏ.kʊŋs.dʁʊk', definition: 'Druckschicht auf der Platine mit Bauteilbezeichnungen und Polaritätsmarkierungen.' }
        ],
        quizQuestion: {
          question: 'Warum müssen differentielle Leiterbahnen bei High-Speed-Signalen exakt gleich lang sein?',
          options: [
            'Um Kupfer zu sparen',
            'Um Laufzeitunterschiede (Skew) zu verhindern und eine saubere Signalübertragung zu sichern',
            'Damit die Platine hitzebeständiger wird',
            'Damit Wechselstrom in Gleichstrom umgewandelt wird'
          ],
          correctIndex: 1,
          explanation: 'Laufzeitunterschiede im Pikosekundenbereich führen bei Differenzsignalen zu Phasenverzerrungen und Datenverlust.'
        }
      },
      zh: {
        languageCode: 'zh',
        languageName: 'Mandarin',
        nativeName: '中文 (简体)',
        flag: '🇨🇳',
        localizedName: 'Altium Designer 高速多层PCB设计系统',
        tagline: '面向受控阻抗、差分等长与电磁屏蔽的高密度互连电路板设计工具。',
        overview: '电子行业主流的EDA设计软件，涵盖原理图绘制、多层HDI叠层结构管理、微带线特征阻抗仿真、高速差分线蛇形等长调谐以及生产打样光绘文件导出。',
        safetyProtocols: [
          '接触与测量打样裸铜电路板时必须佩戴防静电手环（ESD）。',
          '对于高压或强电隔离区域，严格核查安全爬电距离与电气间隙（DRC设计规则）。',
          '大面积敷铜地平面的焊盘务必启用十字花焊盘（热隔离），防止焊接虚焊。',
          '打板发包前务必导出3D STEP模型与结构外壳装配体进行干涉碰撞检查。'
        ],
        quickstartSteps: [
          { step: 1, title: '原理图绘制', desc: '完成器件电气连接与电源网络标注，编译并通过电气规则检查（ERC）。' },
          { step: 2, title: '叠层管理器', desc: '配置4至8层板结构与半固化片介电常数，匹配50欧姆单端阻抗。' },
          { step: 3, title: '差分对走线', desc: '对USB或高速通信差分线进行等长蛇形走线调谐，确保相位对齐。' },
          { step: 4, title: '光绘文件导出', desc: '一键生成 Gerber X2 / ODB++ 菲林光绘与数控钻孔图纸。' }
        ],
        glossary: [
          { term: 'Via', translation: '过孔 (Via)', phonetic: 'guò kǒng', definition: '连接PCB不同铜箔层之间电气信号的金属化沉铜钻孔。' },
          { term: 'Trace', translation: '导线 / 走线', phonetic: 'zǒu xiàn', definition: '电路板表面用于传导电流或高频电气信号的精细铜箔通道。' },
          { term: 'Impedance', translation: '特征阻抗', phonetic: 'tè zhēng zǔ kàng', definition: '高频信号沿传输线传播时所遇到的等效阻抗（通常为50或90欧姆）。' },
          { term: 'Silkscreen', translation: '丝印层', phonetic: 'sī yìn céng', definition: '印制在阻焊漆表面用于标示器件位号、引脚方向与Logo的白色油墨层。' }
        ],
        quizQuestion: {
          question: '在高速差分走线（如USB或HDMI）中，为什么必须严格保证两根信号线等长？',
          options: [
            '为了使电路板图案更加美观对称',
            '避免两路反相信号因传输延迟差异出现相位抖动与时序畸变',
            '减少电路板的整体耗铜量',
            '提高工作电压上限'
          ],
          correctIndex: 1,
          explanation: '差分信号依赖双线抵消共模干扰，只有两条线长度完全一致，信号才能同步到达接收端完成有效解码。'
        }
      },
      ja: {
        languageCode: 'ja',
        languageName: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        localizedName: 'Altium Designer 高速・多層プリント基板設計',
        tagline: 'インピーダンス整合・差動等長配線・ノイズ遮蔽を備えた多層PCB設計環境。',
        overview: '回路図作成、多層基板の層構成設定、高速差動ペア配線の等長調整、基板製造向けガーバーデータの出力までを網羅した業界標準EDAツールです。',
        safetyProtocols: [
          '試作基板の点検作業時には必ず静電気防止（ESD）リストストラップを着用してください。',
          '高電圧回路領域では絶縁沿面距離および空間クリアランス規則（DRC）を厳密にチェックしてください。',
          'GNDベタ面のハンダ付け不良を防ぐため、サーマルリリーフ（十文字接続）が正しく配置されているか点検してください。',
          '基板発注前に3D STEPモデルを出力し、金属筐体との物理的干渉がないか確認してください。'
        ],
        quickstartSteps: [
          { step: 1, title: '回路図キャプチャ', desc: 'シンボルを結線し、ネット名を付与して電気ルールチェック（ERC）を実行します。' },
          { step: 2, title: '層構成マネージャ', desc: '4〜8層スタックアップと誘電率を設定し、50Ωシングルエンド特性インピーダンスを整合させます。' },
          { step: 3, title: '差動配線アコーディオン', desc: 'USBや高速信号の差動ペアに対し、ミアンダ（波状）配線でミリ単位の等長化を行います。' },
          { step: 4, title: 'ガーバー出力', desc: '基板実装工場向けのGerber X2、ドリル穴データ、メタルマスクデータを出力します。' }
        ],
        glossary: [
          { term: 'Via', translation: 'ビア (スルーホール)', phonetic: 'bia', definition: 'PCBの異なる銅箔層同士を電気的に接続するめっき穴。' },
          { term: 'Trace', translation: 'パターン配線', phonetic: 'patān haisen', definition: '電気信号や電源を伝送するために基板表面に形成された銅箔の導電経路。' },
          { term: 'Impedance', translation: '特性インピーダンス', phonetic: 'tokusei inpīdansu', definition: '高周波信号が伝送線路を進む際に生じる交流抵抗（通常50Ωまたは90Ω）。' },
          { term: 'Silkscreen', translation: 'シルク印刷', phonetic: 'shiruku insatsu', definition: '部品番号や極性マークを基板表面に表示するための印刷インク層。' }
        ],
        quizQuestion: {
          question: '高速差動信号配線において、2本の配線長を厳密に一致（等長化）させる理由はどれですか？',
          options: [
            '基板の見た目を左右対称にするため',
            '信号の伝送遅延差（スキュー）を防ぎ、逆位相信号が同時に受信端へ到着するようにするため',
            '基板の総重量を軽くするため',
            '耐熱温度を上昇させるため'
          ],
          correctIndex: 1,
          explanation: '差動信号はノイズを相殺してクリアな信号を復元するため、2本の配線到達タイミングがピコ秒単位で揃っている必要があります。'
        }
      },
      fr: {
        languageCode: 'fr',
        languageName: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        localizedName: 'Altium Designer & Conception PCB Rapide',
        tagline: 'Routage de circuits imprimés multicouches avec contrôle d’impédance et CEM.',
        overview: 'Suite logicielle de référence pour la saisie de schémas électroniques, la gestion d’empilement multicouches et le routage de paires différentielles haute fréquence.',
        safetyProtocols: [
          'Portez un bracelet anti-statique (ESD) lors de la manipulation des prototypes nus.',
          'Vérifiez scrupuleusement les lignes de fuite et distances d’isolement (DRC) sur les zones haute tension.',
          'Vérifiez la présence de freins thermiques sur les plans de masse pour faciliter le soudage.',
          'Exportez systématiquement le modèle 3D STEP pour valider l’intégration dans le boîtier mécanique.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Saisie Schéma', desc: 'Reliez les composants et lancez la vérification des règles électriques (ERC).' },
          { step: 2, title: 'Empilement des couches', desc: 'Définissez la structure 4-8 couches avec impédance contrôlée 50 ohms.' },
          { step: 3, title: 'Routage différentiel', desc: 'Ajustez la longueur des pistes différentielles haute vitesse avec des méandres.' },
          { step: 4, title: 'Génération Gerber', desc: 'Exportez les fichiers de fabrication ODB++ et les plans de perçage.' }
        ],
        glossary: [
          { term: 'Via', translation: 'Trou métallisé (Via)', phonetic: 'vja', definition: 'Orifice percé et métallisé reliant des pistes situées sur différentes couches du circuit.' },
          { term: 'Trace', translation: 'Piste conductrice', phonetic: 'pist kɔ̃.dyk.tʁis', definition: 'Bande de cuivre transportant les signaux ou le courant électrique.' },
          { term: 'Impedance', translation: 'Impédance caractéristique', phonetic: 'ɛ̃.pe.dɑ̃s ka.ʁak.te.ʁis.tik', definition: 'Résistance dynamique opposée à la propagation des signaux haute fréquence (50 ou 90 ohms).' },
          { term: 'Silkscreen', translation: 'Sérigraphie', phonetic: 'se.ʁi.ɡʁa.fi', definition: 'Impression indiquant les repères de composants et la polarité.' }
        ],
        quizQuestion: {
          question: 'Pourquoi l’égalisation des longueurs de pistes est-elle critique sur les paires différentielles ?',
          options: [
            'Pour rendre le circuit imprimé plus élégant',
            'Pour éviter le déphasage temporel et assurer l’arrivée simultanée des deux signaux complémentaires',
            'Pour réduire le poids du cuivre',
            'Pour autoriser un ampérage infini'
          ],
          correctIndex: 1,
          explanation: 'Si les pistes ont des longueurs inégales, le décalage temporel déforme le signal différentiel et provoque des erreurs de transmission.'
        }
      },
      hi: {
        languageCode: 'hi',
        languageName: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        localizedName: 'अल्टियम डिज़ाइनर पीसीबी (PCB) और हाई-स्पीड रूटिंग',
        tagline: 'नियंत्रित प्रतिबाधा और ईएमआई शील्डिंग के साथ मल्टी-लेयर सर्किट बोर्ड डिज़ाइन।',
        overview: 'इलेक्ट्रॉनिक्स उद्योग का अग्रणी सॉफ्टवेयर जो स्कीमेटिक कैप्चर, मल्टी-लेयर पीसीबी स्टैकअप और हाई-स्पीड सिग्नल्स के लिए डिफरेंशियल पेयर रूटिंग की सुविधा देता है।',
        safetyProtocols: [
          'पीसीबी सर्किट बोर्ड को छूते समय एंटी-स्टैटिक (ESD) रिस्ट बैंड अवश्य पहनें।',
          'हाई-वोल्टेज ट्रैक के बीच आवश्यक क्लीयरेंस और इन्सुलेशन दूरी (DRC नियम) जांचें।',
          'ग्राउंड प्लेन पर थर्मल रिलीफ कनेक्शन की जांच करें ताकि सोल्डरिंग में कोई कमी न रहे।',
          'निर्माण से पहले 3D STEP फाइल को कैबिनेट/केसिंग में फिट करके टकराव की जांच करें।'
        ],
        quickstartSteps: [
          { step: 1, title: 'स्कीमैटिक डिज़ाइन', desc: 'सर्किट घटकों को जोड़ें और इलेक्ट्रिकल एरर चेक (ERC) चलाएं।' },
          { step: 2, title: 'लेयर स्टैकअप', desc: '4 से 8 लेयर स्टैकअप सेट करें और 50-ओम इम्पीडेंस मैचिंग करें।' },
          { step: 3, title: 'डिफरेंशियल रूटिंग', desc: 'हाई-स्पीड USB सिग्नल्स के लिए सांप जैसी घुमावदार लाइनों से लंबाई बराबर करें।' },
          { step: 4, title: 'गेरबर फाइल एक्सपोर्ट', desc: 'फैक्ट्री निर्माण के लिए Gerber X2 और ड्रिल फाइलें तैयार करें।' }
        ],
        glossary: [
          { term: 'Via', translation: 'वाया (Via)', phonetic: 'vaɪ.ə', definition: 'पीसीबी की विभिन्न तांबे की परतों को जोड़ने वाला धातुयुक्त छेद।' },
          { term: 'Trace', translation: 'ट्रेस (तांबे की लाइन)', phonetic: 'treːs', definition: 'सर्किट बोर्ड पर बिजली और सिग्नल ले जाने वाला तांबे का पतला रास्ता।' },
          { term: 'Impedance', translation: 'इम्पीडेंस (प्रतिबाधा)', phonetic: 'ɪmˈpiː.dəns', definition: 'हाई-फ्रीक्वेंसी सिग्नल्स के प्रवाह में आने वाला अवरोध (आमतौर पर 50 या 90 ओम)।' },
          { term: 'Silkscreen', translation: 'सिल्कस्क्रीन', phonetic: 'sɪlk.skriːn', definition: 'घटकों के नाम और ध्रुवता दिखाने के लिए बोर्ड पर छपी सफेद स्याही की परत।' }
        ],
        quizQuestion: {
          question: 'हाई-स्पीड सिग्नल्स (जैसे USB) में दोनों तारों की लंबाई बराबर रखना क्यों आवश्यक है?',
          options: [
            'ताकि सर्किट बोर्ड सुंदर दिखे',
            'ताकि दोनों सिग्नल्स बिना किसी देरी के एक ही समय पर रिसीवर तक पहुंच सकें',
            'ताकि बोर्ड का वजन कम हो',
            'ताकि वोल्टेज बढ़ सके'
          ],
          correctIndex: 1,
          explanation: 'डिफरेंशियल सिग्नल्स में शोर समाप्त करने के लिए दोनों सिग्नल्स का एक ही पिको-सेकंड पर पहुंचना अनिवार्य है।'
        }
      },
      pt: {
        languageCode: 'pt',
        languageName: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        localizedName: 'Altium Designer & Roteamento PCB de Alta Velocidade',
        tagline: 'Layout de placa de circuito impresso multicamadas com impedância controlada.',
        overview: 'Software para captura de esquemáticos, empilhamento de camadas e roteamento de pares diferenciais com exportação para fabricação industrial.',
        safetyProtocols: [
          'Use pulseira antiestática (ESD) ao manusear placas em bancada.',
          'Verifique as regras de isolamento (DRC) para pistas de alta tensão.',
          'Confira os alívios térmicos nos planos de aterramento para evitar soldas frias.',
          'Faça o teste de colisão mecânica 3D STEP com o gabinete antes de aprovar a produção.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Esquemático', desc: 'Conecte os componentes e execute a checagem elétrica ERC.' },
          { step: 2, title: 'Stackup', desc: 'Defina a estrutura multicamadas e a impedância de 50 ohms.' },
          { step: 3, title: 'Roteamento', desc: 'Ajuste os comprimentos de pares diferenciais com meandros.' },
          { step: 4, title: 'Gerber', desc: 'Exporte os arquivos ODB++ para a fábrica de placas.' }
        ],
        glossary: [
          { term: 'Via', translation: 'Via de Passagem', phonetic: 'ˈvi.ɐ', definition: 'Furo metalizado condutivo que conecta trilhas entre diferentes camadas da placa.' },
          { term: 'Trace', translation: 'Trilha Condutora', phonetic: 'ˈtɾi.ʎɐ', definition: 'Caminho de cobre na placa que transporta sinais ou corrente.' },
          { term: 'Impedance', translation: 'Impedância Característica', phonetic: 'ĩ.peˈdɐ̃.sjɐ', definition: 'Oposição à corrente alternada em altas frequências.' },
          { term: 'Silkscreen', translation: 'Serigrafia', phonetic: 'se.ɾi.ɡɾaˈfi.ɐ', definition: 'Camada de tinta com marcações de componentes e polaridade.' }
        ],
        quizQuestion: {
          question: 'Por que o casamento de comprimento de trilhas é essencial em pares diferenciais?',
          options: [
            'Para economizar cobre',
            'Para garantir que os sinais cheguem ao mesmo tempo, sem defasagem',
            'Para que a placa não esquente',
            'Para converter corrente contínua em alternada'
          ],
          correctIndex: 1,
          explanation: 'O cancelamento de ruído por sinal diferencial exige que ambos os pulsos cheguem em sincronia absoluta.'
        }
      }
    }
  },
  {
    id: 'kuka-arm',
    name: 'KUKA Industrial 6-DoF Robotic Arm',
    category: 'Robotics & Automation',
    difficulty: 'Advanced Master',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    associatedWorkerIds: ['w-2'],
    workplaceIds: ['wp-2'],
    translations: {
      en: {
        languageCode: 'en',
        languageName: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        localizedName: 'KUKA Industrial 6-DoF Robotic Arm & Controller',
        tagline: 'Heavy payload high-precision robotic manipulation and tool-center-point calibration.',
        overview: 'Heavy industrial multi-axis robotic arm capable of precision milling, automated fiber placement, and high-speed pick-and-place with KUKA smartPAD pendant programming.',
        safetyProtocols: [
          'Always set KUKA smartPAD operation mode to T1 (reduced speed max 250 mm/s) when teaching points in the cell.',
          'Keep hold of the 3-position enabling switch on the back of the smartPAD pendant in the center position.',
          'Never enter cell safety fences while the robot is running in AUT (Automatic) mode.',
          'Ensure tooling payload data (mass, center of gravity, moments of inertia) is entered accurately.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Power On & Jog', desc: 'Boot KRC4 controller, select T1 mode, and jog joints A1 through A6.' },
          { step: 2, title: 'Calibrate TCP', desc: 'Use 4-Point XYZ method with a reference needle to establish Tool Center Point.' },
          { step: 3, title: 'Create Work Base', desc: 'Touch 3 points (Origin, X-axis, Y-axis) to align work coordinate system.' },
          { step: 4, title: 'Teach Path & Run', desc: 'Record PTP and LIN motion commands, test in single-step, then switch to AUT.' }
        ],
        glossary: [
          { term: 'TCP', translation: 'Tool Center Point', phonetic: 'tiː siː piː', definition: 'The origin point of the tool attached to the robot flange from which all coordinates are measured.' },
          { term: 'Singularity', translation: 'Singularity', phonetic: 'ˌsɪŋ.ɡjəˈler.ə.t̬i', definition: 'A configuration where two or more robot joint axes line up, causing infinite mathematical joint speeds.' },
          { term: 'PTP Motion', translation: 'Point-to-Point Motion', phonetic: 'pɔɪnt tuː pɔɪnt', definition: 'Fastest trajectory where all joints start and finish moving simultaneously without following a straight line.' },
          { term: 'LIN Motion', translation: 'Linear Motion', phonetic: 'ˈlɪn.i.ɚ', definition: 'Interpolated straight-line path of the Tool Center Point through 3D space.' }
        ],
        quizQuestion: {
          question: 'What is a "Singularity" in 6-axis robot arm kinematics?',
          options: [
            'When the robot loses Wi-Fi connection',
            'A mechanical posture where joint axes align, locking a degree of freedom and causing dangerous velocity spikes',
            'When the robot battery is completely full',
            'When the tool tip touches the floor'
          ],
          correctIndex: 1,
          explanation: 'In a singularity (e.g. wrist or elbow singularity), the inverse kinematics denominator approaches zero, leading to unachievable joint speeds.'
        }
      },
      es: {
        languageCode: 'es',
        languageName: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        localizedName: 'Brazo Robótico Industrial KUKA de 6 Ejes',
        tagline: 'Manipulación robótica de alta carga y calibración precisa del punto central de herramienta.',
        overview: 'Manipulador robótico industrial de 6 grados de libertad para mecanizado, manipulación a gran velocidad y conformado automatizado, programado mediante consola KUKA smartPAD.',
        safetyProtocols: [
          'Programe siempre en modo T1 (velocidad manual reducida máx 250 mm/s) dentro de la celda.',
          'Mantenga el pulsador de validación de 3 posiciones en la posición central de seguridad.',
          'Nunca ingrese en la celda mientras el robot esté en modo AUT (Automático).',
          'Introduzca con precisión la masa y centro de gravedad de la herramienta instalada.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Arranque y Movimiento', desc: 'Inicie el controlador KRC4, elija T1 y mueva los ejes articulares A1 a A6.' },
          { step: 2, title: 'Calibración TCP', desc: 'Aplique el método de 4 puntos para definir el punto central de herramienta (TCP).' },
          { step: 3, title: 'Definición de Base', desc: 'Toque 3 puntos de referencia para alinear el sistema de coordenadas de trabajo.' },
          { step: 4, title: 'Enseñanza de Puntos', desc: 'Guarde movimientos PTP y LIN, pruebe paso a paso y active el modo automático.' }
        ],
        glossary: [
          { term: 'TCP', translation: 'Punto Central de Herramienta (TCP)', phonetic: 'ˈpun.to senˈtɾal', definition: 'Punto focal en la punta del utillaje desde el cual se calculan todas las trayectorias espaciales.' },
          { term: 'Singularity', translation: 'Singularidad Cinemática', phonetic: 'siŋ.ɡu.la.ɾiˈðað', definition: 'Postura mecánica donde dos ejes se alinean, provocando pérdidas de grados de libertad.' },
          { term: 'PTP Motion', translation: 'Movimiento Punto a Punto (PTP)', phonetic: 'pum.to a ˈpum.to', definition: 'Trayectoria más rápida donde todos los motores coordinan su tiempo de inicio y fin.' },
          { term: 'LIN Motion', translation: 'Movimiento Lineal (LIN)', phonetic: 'mo.βiˈmjen.to li.neˈal', definition: 'Desplazamiento rectilíneo continuo del TCP en el espacio tridimensional.' }
        ],
        quizQuestion: {
          question: '¿Qué es una singularidad en el movimiento de un brazo de 6 ejes?',
          options: [
            'Cuando se corta la conexión eléctrica',
            'Una alineación geométrica de ejes que anula un grado de libertad y exige velocidades infinitas',
            'Cuando el robot tiene la batería llena',
            'Cuando el robot se apaga por descanso'
          ],
          correctIndex: 1,
          explanation: 'La singularidad produce una indeterminación matemática que puede provocar movimientos violentos en los motores.'
        }
      },
      de: {
        languageCode: 'de',
        languageName: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        localizedName: 'KUKA 6-Achs-Industrieroboter & smartPAD',
        tagline: 'Hochpräzise Handhabung und Tool-Center-Point-Kalibrierung für Fertigungszellen.',
        overview: 'Robuster 6-Achs-Industrieroboter für Schwerlast-Handling, Fräsen und Montage mit KUKA KRC4-Steuerung.',
        safetyProtocols: [
          'Beim Teachen im Roboterbereich immer Betriebsart T1 (max. 250 mm/s) wählen.',
          'Den 3-stufigen Zustimmtaster auf der smartPAD-Rückseite in Mittelstellung halten.',
          'Roboterzelle im Automatikmodus (AUT) unter keinen Umständen betreten.',
          'Werkzeuglastdaten (Masse, Schwerpunkt, Trägheit) vorab exakt hinterlegen.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Steuerung hochfahren', desc: 'KRC4 starten, T1-Modus anwählen und Achsen A1 bis A6 verfahren.' },
          { step: 2, title: 'TCP einmessen', desc: 'Werkzeugmittelpunkt mit der 4-Punkt-Methode gegen eine feste Referenzspitze einmessen.' },
          { step: 3, title: 'Basis einrichten', desc: '3 Punkte auf dem Werktisch anfahren, um das Werkstückkoordinatensystem festzulegen.' },
          { step: 4, title: 'Punkte teachen', desc: 'PTP- und LIN-Bewegungen abspeichern, im Einzelschritt testen und auf AUT schalten.' }
        ],
        glossary: [
          { term: 'TCP', translation: 'Werkzeugmittelpunkt (TCP)', phonetic: 'ˈvɛʁk.tsɔɪ̯k.mɪ.tl̩ˌpʊŋkt', definition: 'Bezugspunkt am Werkzeug, auf den sich alle kartesischen Fahrbefehle beziehen.' },
          { term: 'Singularity', translation: 'Singularität', phonetic: 'zɪŋ.ɡu.la.ʁiˈtɛːt', definition: 'Stellung, bei der Achsen kollinear stehen und mathematisch unendliche Geschwindigkeiten fordern.' },
          { term: 'PTP Motion', translation: 'Punkt-zu-Punkt-Bewegung (PTP)', phonetic: 'pʊŋkt tsuː pʊŋkt', definition: 'Schnellste Bahn, bei der alle Achsen zeitgleich starten und stoppen.' },
          { term: 'LIN Motion', translation: 'Linearbewegung (LIN)', phonetic: 'li.neˈaːɐ̯', definition: 'Geradlinige Bewegung des TCPs von Punkt A zu Punkt B im Raum.' }
        ],
        quizQuestion: {
          question: 'Was versteht man unter einer Singularität bei einem Knickarmroboter?',
          options: [
            'Einen Stromausfall im Roboterarm',
            'Eine Achsenkonstellation, bei der Freiheitsgrade verloren gehen und unendliche Gelenkgeschwindigkeiten errechnet werden',
            'Den Ruhezustand über Nacht',
            'Einen Sensorfehler an der Kamera'
          ],
          correctIndex: 1,
          explanation: 'In einer Singularitätsstellung verliert die Jacobi-Matrix ihren vollen Rang, was zu Achsbeschleunigungen an den mechanischen Grenzen führt.'
        }
      },
      zh: {
        languageCode: 'zh',
        languageName: 'Mandarin',
        nativeName: '中文 (简体)',
        flag: '🇨🇳',
        localizedName: '库卡 KUKA 六轴工业机器人与智能示教器',
        tagline: '面向重载工件高精抓取、打磨切削与工具中心点（TCP）标定的工业母机。',
        overview: '具备六个旋转自由度的德国工业级机械臂，依靠 KRC4 控制柜与 smartPAD 手持示教盒，完成连续轨迹铣削、激光焊接与柔性装配作业。',
        safetyProtocols: [
          '在安全防护栏内进行示教编程时，运行模式必须强制切换至 T1（降速模式，末端速度上限 250 mm/s）。',
          '手持示教器背面配备的三段式使能开关必须保持在中间允许档位，松开或捏死均会触发安全急停。',
          '机器人处于 AUT（全自动循环）运行状态时，任何人严禁跨越安全光栅进入动作包络区。',
          '必须根据所安装末端夹爪的真实物理参数，准确配置负载质量、质心偏置及转动惯量。'
        ],
        quickstartSteps: [
          { step: 1, title: '通电点动', desc: '启动KRC4控制系统，选择T1模式，轻推操纵杆依次微调A1至A6关节轴。' },
          { step: 2, title: '标定TCP', desc: '采用四点法对准固定基准参考销，精确计算工具中心点空间坐标。' },
          { step: 3, title: '建立工件基座', desc: '采用三点法定义作业台原点、X正方向及Y轴平面，建立用户坐标系。' },
          { step: 4, title: '示教并试跑', desc: '示教记录PTP快速定位点与LIN空间直线轨迹，单步慢速试运行无误后切入自动。' }
        ],
        glossary: [
          { term: 'TCP', translation: '工具中心点 (TCP)', phonetic: 'gōng jù zhōng xīn diǎn', definition: '机器人末端安装工具的作业参考原点，所有空间坐标指令均以此点为基准。' },
          { term: 'Singularity', translation: '运动学奇异点', phonetic: 'qí yì diǎn', definition: '机械臂若干关节轴线重合共线时，丢失自由度并导致理论关节速度趋于无穷大的机械姿态。' },
          { term: 'PTP Motion', translation: '点到点运动 (PTP)', phonetic: 'diǎn dào diǎn', definition: '各关节同时启动、同时减速停止的最快速空间非直线过渡轨迹。' },
          { term: 'LIN Motion', translation: '空间直线运动 (LIN)', phonetic: 'zhí xiàn yùn dòng', definition: '工具中心点（TCP）在空间中沿严格直线轨迹插补移动的控制模式。' }
        ],
        quizQuestion: {
          question: '工业机器人的“奇异点（Singularity）”指的是什么现象？',
          options: [
            '机器人突然断开局域网通信',
            '机械臂关节轴线共线对齐，导致逆解丢失自由度并可能引发电机剧烈超速抖动',
            '机械爪电池充满电时的状态',
            '气动夹爪气压不足的提示'
          ],
          correctIndex: 1,
          explanation: '奇异点会导致雅可比矩阵奇异，控制器在逆解时计算出无限大的角速度，因此路径规划时必须绕开奇异区域。'
        }
      },
      ja: {
        languageCode: 'ja',
        languageName: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        localizedName: 'KUKA 6軸産業用ロボットアーム＆コントローラ',
        tagline: '高可搬重量・高精度マニピュレーションとツールセンターポイント校正。',
        overview: '6自由度を備えた産業用アームで、切削加工や自動積層、高速搬送をKUKA smartPADティーチペンダントにより制御します。',
        safetyProtocols: [
          'ロボットセル内でのティーチング作業時は、必ずT1モード（最高速度250mm/s以下）に切り替えてください。',
          'smartPAD背面にある3ポジションイネーブルスイッチの中間押し込み位置を確実に維持してください。',
          'AUT（自動運転）モード稼働中は、安全柵や光線エリア内へ絶対に進入しないでください。',
          'ツールの質量、重心位置、慣性モーメントのデータを正確にコントローラへ登録してください。'
        ],
        quickstartSteps: [
          { step: 1, title: '起動・手動操作', desc: 'KRC4を起動し、T1モードでA1〜A6軸をジョグ送りで動作確認します。' },
          { step: 2, title: 'TCP較正', desc: '基準針に対して4点法を用い、ツールセンターポイント（TCP）を定義します。' },
          { step: 3, title: 'ベース座標設定', desc: '作業台上の3点をタッチして原点と軸方向を決め、ワーク座標系を作成します。' },
          { step: 4, title: 'ポイント記録', desc: 'PTPおよびLIN動作を教示記録し、ステップ送りで干渉がないことを確認します。' }
        ],
        glossary: [
          { term: 'TCP', translation: 'ツールセンターポイント (TCP)', phonetic: 'tsūru sentā pointo', definition: 'ロボット先端工具の作業原点であり、すべての直交座標指令の基準となる点。' },
          { term: 'Singularity', translation: '特異点 (シンギュラリティ)', phonetic: 'tokuiten', definition: '複数の軸が同一線上に並び、自由度が縮退して理論上無限大の回転速度を要求する姿勢。' },
          { term: 'PTP Motion', translation: 'PTP補間 (各軸補間)', phonetic: 'pī tī pī hokan', definition: 'すべての軸が同時に動き出し同時に停止する最短時間の移動方式。' },
          { term: 'LIN Motion', translation: '直線補间 (LIN)', phonetic: 'chokusen hokan', definition: 'TCPが空間上を一直線に移動する動作補間方式。' }
        ],
        quizQuestion: {
          question: '6軸多関節ロボットアームにおける「特異点」とはどのような状態ですか？',
          options: [
            '通信ケーブルが断線した状態',
            '軸同士が同一直線上に重なり、逆運動学計算において自由度を失い関節速度が急上昇する姿勢',
            'ロボットのバッテリ残量が100%になった状態',
            'グリッパーが床面に接触した瞬間'
          ],
          correctIndex: 1,
          explanation: '特異点近傍では微小な手先移動に対して関節が高速回転するため、軌道計画時に回避する必要があります。'
        }
      },
      fr: {
        languageCode: 'fr',
        languageName: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        localizedName: 'Bras Robotique Industriel 6 Axes KUKA',
        tagline: 'Manipulation lourde haute précision et étalonnage du Tool Center Point.',
        overview: 'Robot industriel 6 axes haute charge pour l’usinage, le placement de fibres et l’assemblage automatisé avec pupitre smartPAD.',
        safetyProtocols: [
          'Utilisez obligatoirement le mode T1 (vitesse réduite à 250 mm/s) lors de l’apprentissage dans la cellule.',
          'Maintenez le commutateur d’assentiment 3 positions du smartPAD en position médiane.',
          'N’entrez jamais dans la zone clôturée quand le robot est en mode AUT (Automatique).',
          'Renseignez scrupuleusement la masse et le centre de gravité de l’outil monté.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Mise sous tension', desc: 'Allumez la baie KRC4, sélectionnez T1 et déplacez les axes A1 à A6.' },
          { step: 2, title: 'Calibrage TCP', desc: 'Mesurez le centre de l’outil via la méthode 4 points sur pointe fixe.' },
          { step: 3, title: 'Repère de base', desc: 'Définissez l’origine et l’orientation du plateau de travail avec 3 points.' },
          { step: 4, title: 'Apprentissage', desc: 'Enregistrez les trajectoires PTP et LIN, testez pas à pas avant le mode automatique.' }
        ],
        glossary: [
          { term: 'TCP', translation: 'Centre Outil (TCP)', phonetic: 'sɑ̃tʁ u.ti', definition: 'Point focal à l’extrémité de l’effecteur par rapport auquel sont calculés les mouvements.' },
          { term: 'Singularity', translation: 'Singularité', phonetic: 'sɛ̃.ɡy.la.ʁi.te', definition: 'Configuration mécanique où des axes s’alignent, bloquant un degré de liberté.' },
          { term: 'PTP Motion', translation: 'Mouvement Point à Point (PTP)', phonetic: 'mwɑ̃ pwɛ̃ a pwɛ̃', definition: 'Déplacement le plus rapide où tous les axes démarrent et s’arrêtent simultanément.' },
          { term: 'LIN Motion', translation: 'Mouvement Linéaire (LIN)', phonetic: 'li.ne.ɛʁ', definition: 'Trajectoire rectiligne interpolée du TCP dans l’espace cartésien.' }
        ],
        quizQuestion: {
          question: 'Que provoque une singularité dans la cinématique d’un robot 6 axes ?',
          options: [
            'Une coupure de batterie',
            'L’alignement des axes provoquant une perte de liberté et des vitesses articulaires théoriquement infinies',
            'Une mise en veille programmée',
            'La surchauffe du boîtier de commande'
          ],
          correctIndex: 1,
          explanation: 'La singularité cinématique annule le déterminant jacobien, imposant des contraintes mathématiques critiques sur les servomoteurs.'
        }
      },
      hi: {
        languageCode: 'hi',
        languageName: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳',
        localizedName: 'कुका (KUKA) 6-एक्सिस इंडस्ट्रियल रोबोटिक आर्म',
        tagline: 'भारी वजन उठाने और टूल सेंटर पॉइंट (TCP) कैलिब्रेशन के लिए औद्योगिक रोबोट।',
        overview: 'औद्योगिक 6-डिग्री-ऑफ-फ्रीडम रोबोटिक आर्म जो उच्च परिशुद्धता मिलिंग, ऑटोमेटेड असेंबली और KUKA smartPAD पेंडेंट प्रोग्रामिंग में सक्षम है।',
        safetyProtocols: [
          'रोबोट सेल में काम करते समय हमेशा मोड T1 (कम गति अधिकतम 250 मिमी/सेकंड) रखें।',
          'smartPAD पेंडेंट के पीछे 3-पोजीशन इनेबलिंग स्विच को बीच की स्थिति में दबाकर रखें।',
          'जब रोबोट ऑटोमैटिक (AUT) मोड में चल रहा हो, तो सुरक्षा बाड़े के अंदर कभी न जाएं।',
          'टूल का वजन, गुरुत्वाकर्षण केंद्र और जड़त्व आघूर्ण (Inertia) सटीक रूप से दर्ज करें।'
        ],
        quickstartSteps: [
          { step: 1, title: 'पावर ऑन और जॉग', desc: 'KRC4 कंट्रोलर चालू करें, T1 मोड चुनें और जोड़ों A1 से A6 को चलाकर देखें।' },
          { step: 2, title: 'TCP कैलिब्रेट करें', desc: 'टूल सेंटर पॉइंट निर्धारित करने के लिए 4-पॉइंट विधि का उपयोग करें।' },
          { step: 3, title: 'वर्क बेस बनाएं', desc: 'कार्यक्षेत्र सेट करने के लिए 3 बिंदुओं को टच करें।' },
          { step: 4, title: 'पथ सिखाएं और चलाएं', desc: 'PTP और LIN कमांड रिकॉर्ड करें, सिंगल स्टेप में जांचें, फिर AUT मोड शुरू करें।' }
        ],
        glossary: [
          { term: 'TCP', translation: 'टूल सेंटर पॉइंट (TCP)', phonetic: 'tuːl ˈsɛn.tər pɔɪnt', definition: 'रोबोट टूल की नोक पर स्थित वह बिंदु जिससे सभी निर्देशांक मापे जाते हैं।' },
          { term: 'Singularity', translation: 'सिंगुलैरिटी (विषमता)', phonetic: 'ˌsɪŋ.ɡjʊˈlær.ɪ.ti', definition: 'वह स्थिति जब रोबोट के दो या अधिक जोड़ एक सीध में आ जाते हैं।' },
          { term: 'PTP Motion', translation: 'पॉइंट-टू-पॉइंट गति (PTP)', phonetic: 'pɔɪnt tuː pɔɪnt', definition: 'सबसे तेज़ गति जहां सभी मोटरें एक साथ शुरू और बंद होती हैं।' },
          { term: 'LIN Motion', translation: 'लीनियर गति (LIN)', phonetic: 'ˈlɪn.i.ər', definition: 'अंतरिक्ष में टूल सेंटर पॉइंट का एक सीधी रेखा में गति करना।' }
        ],
        quizQuestion: {
          question: '6-एक्सिस रोबोट में "सिंगुलैरिटी" क्या होती है?',
          options: [
            'रोबोट का इंटरनेट बंद होना',
            'ऐसी स्थिति जहां रोबोट के जोड़ एक सीधी रेखा में आकर डिग्री ऑफ फ्रीडम खो देते हैं',
            'रोबोट की बैटरी का 100% होना',
            'रोबोट का जमीन छूना'
          ],
          correctIndex: 1,
          explanation: 'सिंगुलैरिटी में रोबोट की गणितीय गणना में शून्य से विभाजन की स्थिति उत्पन्न होती है, जिससे जोड़ों की गति अचानक बहुत बढ़ सकती है।'
        }
      },
      pt: {
        languageCode: 'pt',
        languageName: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷',
        localizedName: 'Braço Robótico Industrial KUKA de 6 Eixos',
        tagline: 'Manipulação de alta carga e calibração de Tool Center Point para células fabris.',
        overview: 'Braço robótico articulado de 6 graus de liberdade com console KUKA smartPAD para montagem, soldagem e usinagem.',
        safetyProtocols: [
          'Opere sempre em modo T1 (velocidade reduzida máx 250 mm/s) dentro da célula.',
          'Mantenha o interruptor de validação do smartPAD na posição intermediária.',
          'Nunca entre na célula durante o modo automático (AUT).',
          'Configure a massa e centro de gravidade exatos da garra instalada.'
        ],
        quickstartSteps: [
          { step: 1, title: 'Inicialização', desc: 'Ligue o KRC4 e movimente os eixos A1 a A6 em modo T1.' },
          { step: 2, title: 'Calibragem TCP', desc: 'Utilize o método de 4 pontos para definir o centro da ferramenta.' },
          { step: 3, title: 'Base de Trabalho', desc: 'Defina o plano cartesiano tocando em 3 pontos da mesa.' },
          { step: 4, title: 'Gravação de Pontos', desc: 'Grave trajetórias PTP e LIN e teste antes do modo automático.' }
        ],
        glossary: [
          { term: 'TCP', translation: 'Ponto Central da Ferramenta (TCP)', phonetic: 'ˈpõ.tu sẽˈtɾaw', definition: 'Ponto na ponta da ferramenta que dita todas as coordenadas espaciais.' },
          { term: 'Singularity', translation: 'Singularidade Cinemática', phonetic: 'sĩ.ɡu.la.ɾiˈda.dʒi', definition: 'Alinhamento de eixos que elimina um grau de liberdade e exige velocidades inviáveis.' },
          { term: 'PTP Motion', translation: 'Movimento Ponto a Ponto', phonetic: 'ˈpõ.tu a ˈpõ.tu', definition: 'Movimento coordenado mais veloz onde os eixos iniciam e param juntos.' },
          { term: 'LIN Motion', translation: 'Movimento Linear', phonetic: 'li.neˈaʁ', definition: 'Deslocamento em linha reta absoluta do TCP pelo espaço tridimensional.' }
        ],
        quizQuestion: {
          question: 'O que caracteriza uma singularidade em braços robóticos?',
          options: [
            'Falta de óleo no motor',
            'Alinhamento de eixos que leva a perda de liberdade de movimento e picos de velocidade',
            'Bateria recarregada',
            'Comunicação Wi-Fi perdida'
          ],
          correctIndex: 1,
          explanation: 'Na singularidade cinemática, o jacobiano se anula, tornando impraticável o cálculo de trajetórias lineares.'
        }
      }
    }
  }
];
