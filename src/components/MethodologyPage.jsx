export default function MethodologyPage({ onBack }) {
  return (
    <div className="methodology">
      <button className="back-btn" onClick={onBack}>
        &larr; Back
      </button>

      <h1>Methodology</h1>
      <p className="methodology-subtitle">
        Why CogniMetrics exists, how it works, and why it measures what it claims to measure.
      </p>

      <h2>The Problem with Existing IQ Tests</h2>
      <p>
        Most online IQ tests fall into two categories: <strong>entertainment quizzes</strong> that
        produce flattering but meaningless numbers, or <strong>overpriced clinical knockoffs</strong>
        that copy established test formats without understanding why those formats work.
      </p>
      <p>
        The fundamental issue is a confusion between <em>surface structure</em> and
        <em>deep structure</em>. A matrix completion task doesn't measure fluid reasoning
        because it uses matrices — it measures fluid reasoning because of the <em>cognitive
        operations</em> required to solve it: simultaneous rule extraction, relational binding,
        and novel pattern detection. The matrix is a vehicle, not the measurement itself.
      </p>
      <p>
        This means you don't need to copy Raven's Progressive Matrices to measure what
        Raven's measures. You need to create tasks that impose the same <em>structural
        demands</em> on cognition — regardless of surface appearance. This principle is
        called <strong>cross-structural isomorphism</strong>.
      </p>

      <h2>Cross-Structural Isomorphism</h2>
      <p>
        An isomorphism is a structure-preserving mapping between two systems. Two tasks are
        cross-structurally isomorphic if they require the same latent cognitive operations
        despite having different surface features.
      </p>
      <p>
        Consider: "What comes next: 2, 4, 8, 16, ___?" and a visual pattern where shapes
        double in each frame. These look nothing alike, but both require the same cognitive
        operation — identifying a multiplicative progression rule and applying it to generate
        a novel output. They are structurally isomorphic.
      </p>
      <p>
        CogniMetrics is built entirely on this principle. Every item is designed by
        identifying the <strong>structural demands</strong> of established cognitive measures
        and creating original items that preserve those demands. The result is a test that
        measures the same constructs as clinical instruments — not because it copies them,
        but because it shares their deep structure.
      </p>

      <h2>Why No Norming?</h2>
      <p>
        This is perhaps our most controversial position, so let's be explicit about the argument.
      </p>
      <p>
        <strong>Classical Test Theory (CTT)</strong> defines a person's score relative to a
        norm group. Your IQ is "how many standard deviations above/below the mean of
        the normative sample." This creates an inescapable dependency: without a large,
        representative norm sample, scores are meaningless.
      </p>
      <p>
        <strong>Item Response Theory (IRT)</strong> fundamentally changes this. In IRT,
        item parameters (difficulty, discrimination) and person parameters (ability) exist
        on the same scale and are <em>sample-independent</em>. This is called
        <strong>parameter invariance</strong> — the item parameters don't change depending
        on who takes the test, and the person's ability estimate doesn't change depending
        on which items are administered (given sufficient item quality).
      </p>
      <p>
        This means that if item parameters are correctly specified, the ability estimate
        is absolute — it doesn't require comparison to a norm group. The question shifts
        from "how does this person compare to others?" to "what is this person's probability
        of correctly solving items at each difficulty level?"
      </p>
      <p>
        We calibrate item parameters through <strong>structural analysis</strong>: the
        difficulty of an item is determined by the number of simultaneous cognitive operations
        required, the complexity of relational bindings, the working memory load, and the
        novelty of the required inference. These properties are inherent to the item, not
        derived from group performance.
      </p>
      <p>
        <em>Note: We acknowledge that empirical calibration can refine structural estimates.
        As we collect response data, we will update item parameters empirically. But the
        structural calibration provides a valid starting point — not a placeholder.</em>
      </p>

      <h2>The Gf Decomposition</h2>
      <p>
        A distinctive feature of CogniMetrics is the decomposition of fluid reasoning (Gf)
        into two components. Most tests report a single Gf score, but this collapses an
        important distinction:
      </p>
      <h3>Gf-WM (Working Memory weighted)</h3>
      <p>
        Measured by <strong>Pattern Matrices</strong>. These items require holding and
        actively manipulating visual information — tracking multiple transformation rules
        simultaneously while constructing the missing element. The bottleneck is
        <em>active maintenance under transformation</em>: can you keep track of several
        rules while applying them?
      </p>
      <h3>Gf-WMC (Working Memory Capacity weighted)</h3>
      <p>
        Measured by <strong>Relational Reasoning</strong>. These items require holding a
        complex relational structure in mind — multiple premises, conditional relationships,
        transitive orderings. The bottleneck is <em>the total amount of relational
        information that can be simultaneously maintained</em>, not the transformation
        of that information.
      </p>
      <p>
        This distinction matters because people can have:
      </p>
      <ul>
        <li><strong>High WM, Low WMC:</strong> Excellent at manipulating small amounts of
        information but struggles when the relational complexity exceeds ~4 bindings.
        Good at chess tactics, struggles with chess strategy.</li>
        <li><strong>Low WM, High WMC:</strong> Can hold large relational structures but
        struggles with rapid manipulation. Good at understanding complex systems, slower
        at real-time problem-solving.</li>
      </ul>
      <p>
        Collapsing these into a single Gf score hides this profile asymmetry, which has
        real implications for understanding how a person thinks.
      </p>

      <h2>Theoretical Framework: CHC</h2>
      <p>
        CogniMetrics is aligned with the <strong>Cattell-Horn-Carroll (CHC) theory</strong> —
        the most empirically supported taxonomy of cognitive abilities. We measure five
        broad abilities through seven subtests:
      </p>
      <table>
        <thead>
          <tr>
            <th>Subtest</th>
            <th>CHC Factor</th>
            <th>What It Demands</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pattern Matrices</td>
            <td><code>Gf-WM</code></td>
            <td>Simultaneous rule extraction + active manipulation</td>
          </tr>
          <tr>
            <td>Relational Reasoning</td>
            <td><code>Gf-WMC</code></td>
            <td>Multi-premise deduction + relational binding capacity</td>
          </tr>
          <tr>
            <td>Conceptual Links</td>
            <td><code>Gc</code></td>
            <td>Verbal analogical reasoning + conceptual abstraction</td>
          </tr>
          <tr>
            <td>Word Depth</td>
            <td><code>Gc</code></td>
            <td>Semantic precision + vocabulary depth</td>
          </tr>
          <tr>
            <td>Memory Sequences</td>
            <td><code>Gwm</code></td>
            <td>Forward/backward digit span + sequential WM</td>
          </tr>
          <tr>
            <td>Quantitative Reasoning</td>
            <td><code>Gq</code></td>
            <td>Numerical pattern recognition + mathematical inference</td>
          </tr>
          <tr>
            <td>Speed Match</td>
            <td><code>Gs</code></td>
            <td>Perceptual matching speed + accuracy under pressure</td>
          </tr>
        </tbody>
      </table>

      <h2>Scoring Model: IRT 2PL</h2>
      <p>
        We use the <strong>Two-Parameter Logistic (2PL)</strong> model from Item Response Theory:
      </p>
      <p style={{ textAlign: 'center', fontSize: 18, fontFamily: 'var(--mono)', margin: '24px 0' }}>
        P(&theta;) = 1 / (1 + e<sup>-a(&theta; - b)</sup>)
      </p>
      <p>Where:</p>
      <ul>
        <li><code>&theta;</code> (theta) — latent ability on a continuous scale</li>
        <li><code>a</code> — discrimination: how sharply the item differentiates between
        ability levels (higher = better at distinguishing)</li>
        <li><code>b</code> — difficulty: the ability level at which P(correct) = 50%</li>
      </ul>
      <p>
        Ability is estimated via <strong>Maximum Likelihood Estimation (MLE)</strong>:
        we find the &theta; value that maximizes the likelihood of the observed response
        pattern. Grid search provides the initial estimate, refined by Newton-Raphson iteration.
      </p>
      <p>
        The theta estimate is then linearly transformed to the IQ scale:
      </p>
      <p style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 16, margin: '16px 0' }}>
        IQ = 100 + &theta; &times; 15
      </p>

      <h2>Score Interpretation</h2>
      <table>
        <thead>
          <tr>
            <th>IQ Range</th>
            <th>Classification</th>
            <th>Percentile</th>
            <th>Prevalence</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>145+</td><td>Exceptionally Gifted</td><td>99.9th+</td><td>~1 in 1,000</td></tr>
          <tr><td>130-144</td><td>Very Superior</td><td>98th-99.8th</td><td>~1 in 50</td></tr>
          <tr><td>120-129</td><td>Superior</td><td>91st-97th</td><td>~1 in 10</td></tr>
          <tr><td>110-119</td><td>High Average</td><td>75th-90th</td><td>~1 in 4</td></tr>
          <tr><td>90-109</td><td>Average</td><td>25th-74th</td><td>~1 in 2</td></tr>
          <tr><td>80-89</td><td>Low Average</td><td>9th-24th</td><td>~1 in 6</td></tr>
          <tr><td>70-79</td><td>Borderline</td><td>2nd-8th</td><td>~1 in 16</td></tr>
          <tr><td>&lt;70</td><td>Extremely Low</td><td>&lt;2nd</td><td>~1 in 50</td></tr>
        </tbody>
      </table>

      <h2>Ceiling & Measurement Range</h2>
      <p>
        CogniMetrics measures from <strong>IQ 40</strong> (&theta; = -4.0) to
        <strong>IQ 160</strong> (&theta; = +4.0). Items at the highest difficulty levels
        (b &gt; 2.0) are specifically designed to require cognitive operations that only
        become possible at exceptional ability levels — such as holding 3+ simultaneous
        transformation rules, managing 6+ relational bindings, or extracting higher-order
        patterns from patterns.
      </p>

      <h2>Verification</h2>
      <p>
        Each certificate includes a verification code generated via <strong>HMAC-SHA256</strong>.
        This cryptographic signature encodes the test ID, composite score, date, and subtest
        scores — making the certificate tamper-evident. The code can be verified to confirm
        result authenticity.
      </p>

      <h2>Limitations</h2>
      <p>
        We believe in transparency about what this test is and isn't:
      </p>
      <ul>
        <li>This is <strong>not a clinical diagnostic instrument</strong>. For clinical
        evaluation, consult a licensed psychologist.</li>
        <li>Item parameters are structurally calibrated, not empirically normed on a
        large sample (yet). Empirical refinement will improve precision over time.</li>
        <li>Online administration introduces uncontrolled variables (environment,
        distractions, device) that reduce measurement precision compared to
        individually-administered tests.</li>
        <li>The Gc subtests (Conceptual Links, Word Depth) are currently English-only,
        introducing language bias for non-native speakers.</li>
      </ul>
      <p>
        That said: the <em>structural validity</em> of the measurement model means that
        relative score interpretations — especially factor profile analysis (e.g., Gf-WM
        vs Gf-WMC discrepancy) — are highly informative regardless of absolute calibration.
      </p>

      <h2>References</h2>
      <ul>
        <li>Carroll, J.B. (1993). <em>Human Cognitive Abilities: A Survey of Factor-Analytic Studies.</em> Cambridge University Press.</li>
        <li>McGrew, K.S. (2009). CHC theory and the human cognitive abilities project. <em>Intelligence, 37</em>(1), 1-10.</li>
        <li>Embretson, S.E. & Reise, S.P. (2000). <em>Item Response Theory for Psychologists.</em> Lawrence Erlbaum Associates.</li>
        <li>Engle, R.W. (2002). Working memory capacity as executive attention. <em>Current Directions in Psychological Science, 11</em>(1), 19-23.</li>
        <li>Oberauer, K. (2002). Access to information in working memory. <em>Journal of Experimental Psychology: Learning, Memory, and Cognition, 28</em>(3), 411-421.</li>
        <li>Horn, J.L. & Cattell, R.B. (1966). Refinement and test of the theory of fluid and crystallized general intelligences. <em>Journal of Educational Psychology, 57</em>(5), 253-270.</li>
      </ul>

      <div style={{ marginTop: 48, padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          CogniMetrics was designed by <strong style={{ color: 'var(--text-secondary)' }}>Muhammet Baris Akdag</strong>
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 8 }}>
          Cross-structural isomorphism framework &middot; CHC-aligned &middot; IRT-scored
        </p>
      </div>
    </div>
  );
}
