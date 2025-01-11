<script>
  import "../routes/app.css";
  let { children } = $props();
</script>

<div class="navbar">
  <nav>
    <a href="/">home</a>
    <a href="/pacientes">Pacientes</a>
    <a href="/medicos">medicos</a>
  </nav>
</div>

{@render children()}
